<?php
declare(strict_types=1);

namespace Demo\Bundle\ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;

use Demo\Bundle\ThumbnailBundle\Generator\ThumbnailGeneratorParams;

/**
 * Class VideoGenerateThumbnailType
 */
class VideoGenerateThumbnailType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('quality', TextType::class)
            ->add('extension', TextType::class)
            ->add('time', TimeType::class, ['widget' => 'single_text', 'with_seconds' => true])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'method'          => 'POST',
            'data_class'      => ThumbnailGeneratorParams::class,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'video_generate_thumbnail';
    }
}
