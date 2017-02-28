<?php
declare(strict_types=1);

namespace Demo\Bundle\ThumbnailBundle\Generator;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class ThumbnailGeneratorParams
 */
class ThumbnailGeneratorParams
{
    /**
     * @var string|null
     *
     * @Assert\NotBlank
     */
    private $videoId;

    /**
     * @var \DateTime|null
     *
     * @Assert\NotNull
     */
    private $time;

    /**
     * @var string|null
     *
     * @Assert\NotBlank
     */
    private $quality;

    /**
     * @var string|null
     *
     * @Assert\NotBlank
     */
    private $extension;

    /**
     * @return string|null
     */
    public function getVideoId(): ?string
    {
        return $this->videoId;
    }

    /**
     * @param string|null $videoId
     */
    public function setVideoId(?string $videoId)
    {
        $this->videoId = $videoId;
    }

    /**
     * @return \DateTime|null
     */
    public function getTime(): ?\DateTime
    {
        return $this->time;
    }

    /**
     * @param \DateTime|null $time
     */
    public function setTime(?\DateTime $time)
    {
        $this->time = $time;
    }

    /**
     * @return string|null
     */
    public function getQuality(): ?string
    {
        return $this->quality;
    }

    /**
     * @param string|null $quality
     */
    public function setQuality(?string $quality)
    {
        $this->quality = $quality;
    }

    /**
     * @return null|string
     */
    public function getExtension(): ?string
    {
        return $this->extension;
    }

    /**
     * @param null|string $extension
     */
    public function setExtension(?string $extension)
    {
        $this->extension = $extension;
    }
}
