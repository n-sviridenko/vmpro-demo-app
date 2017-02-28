<?php

namespace Demo\Bundle\ApiBundle\Normalizer;

use MovingImage\Client\VMPro\Entity\Video;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Class VideoNormalizer
 */
class VideoNormalizer implements NormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = [])
    {
        /** @var Video $video */
        $video = $object;

        return [
            'id'        => $video->getId(),
            'title'     => $video->getTitle(),
            'thumbnail' => $video->getThumbnail(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return ($data instanceof Video);
    }
}
