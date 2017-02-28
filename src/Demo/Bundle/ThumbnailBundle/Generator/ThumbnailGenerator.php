<?php
declare(strict_types=1);

namespace Demo\Bundle\ThumbnailBundle\Generator;

use Http\Client\HttpClient;
use Http\Message\MessageFactory;
use Symfony\Component\Process\Process;
use Http\Discovery\MessageFactoryDiscovery;
use Symfony\Component\Filesystem\Filesystem;
use MovingImage\Client\VMPro\Interfaces\ApiClientInterface;

/**
 * Class ThumbnailGenerator
 */
class ThumbnailGenerator
{
    /**
     * @var ApiClientInterface
     */
    private $client;

    /**
     * @var HttpClient
     */
    private $httpClient;

    /**
     * @var MessageFactory
     */
    private $messageFactory;

    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * @var int
     */
    private $videoManagerId;

    /**
     * @var string
     */
    private $thumbnailDir;

    /**
     * @var string
     */
    private $thumbnailDirPrefix;

    /**
     * ThumbnailGenerator constructor.
     *
     * @param ApiClientInterface $client
     * @param HttpClient         $httpClient
     * @param int                $videoManagerId
     * @param string             $thumbnailDir
     */
    public function __construct(
        ApiClientInterface $client,
        HttpClient $httpClient,
        int $videoManagerId,
        string $thumbnailDir,
        string $thumbnailDirPrefix
    ) {
        $this->client             = $client;
        $this->httpClient         = $httpClient;
        $this->messageFactory     = MessageFactoryDiscovery::find();
        $this->filesystem         = new Filesystem();
        $this->videoManagerId     = $videoManagerId;
        $this->thumbnailDir       = $thumbnailDir;
        $this->thumbnailDirPrefix = $thumbnailDirPrefix;
    }

    /**
     * @param ThumbnailGeneratorParams $params
     *
     * @return string
     */
    public function generateThumbnail(ThumbnailGeneratorParams $params): string
    {
        $videoUrl      = $this->getVideoUrl($params->getVideoId(), $params->getExtension(), $params->getQuality());
        $videoPath     = $this->generateRandomPath($params->getExtension());
        $thumbnailPath = $this->generateRandomPath('jpg');

        $this->downloadVideo($videoUrl, $videoPath);
        $this->doGenerateThumbnail($videoPath, $thumbnailPath, $params->getTime());

        $this->filesystem->remove($videoPath);

        if (!$this->filesystem->exists($thumbnailPath)) {
            throw new \RuntimeException('Could not generate thumbnail.');
        }

        return substr($thumbnailPath, strlen($this->thumbnailDirPrefix));
    }

    /**
     * @param string $videoId
     * @param string $quality
     *
     * @return string
     */
    private function getVideoUrl(string $videoId, string $extension, string $quality): string
    {
        $urls = $this->client->getVideoDownloadUrls($this->videoManagerId, $videoId);

        foreach ($urls as $url) {
            if ($url->getQuality() === $quality && $this->getExtensionByUrl($url->getUrl()) === $extension) {
                return $url->getUrl();
            }
        }

        throw new \RuntimeException(
            sprintf('Could not find thumbnail url for video "%s" with quality "%s".', $videoId, $quality)
        );
    }

    /**
     * @param string $extension
     *
     * @return string
     */
    private function generateRandomPath(string $extension): string
    {
        $hash = time().'-'.md5(random_bytes(64));

        return $this->thumbnailDirPrefix.$this->thumbnailDir.$hash.'.'.$extension;
    }

    /**
     * @param string $videoUrl
     * @param string $destination
     */
    private function downloadVideo(string $videoUrl, string $destination)
    {
        $request   = $this->messageFactory->createRequest('GET', $videoUrl);
        $response  = $this->httpClient->sendRequest($request);

        $this->filesystem->dumpFile($destination, $response->getBody()->getContents());
    }

    /**
     * @param string $url
     *
     * @return string
     */
    private function getExtensionByUrl(string $url): string
    {
        $parts = explode('.', basename($url));

        return $parts[count($parts) - 1];
    }

    /**
     * @param string    $videoPath
     * @param string    $thumbnailPath
     * @param \DateTime $time
     */
    private function doGenerateThumbnail(string $videoPath, string $thumbnailPath, \DateTime $time)
    {
        $command = sprintf(
            'ffmpeg -ss %s -i %s -vframes 1 -f image2 %s',
            $time->format('H:i:s'),
            $videoPath,
            $thumbnailPath
        );

        $process = new Process($command);
        $process->run();
    }
}
