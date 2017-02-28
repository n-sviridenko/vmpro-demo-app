<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = [
            // Symfony
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),

            // Others
            new Lexik\Bundle\JWTAuthenticationBundle\LexikJWTAuthenticationBundle(),
            new FOS\RestBundle\FOSRestBundle(),
            new Nelmio\CorsBundle\NelmioCorsBundle(),
            new MovingImage\Bundle\VMProApiBundle\VMProApiBundle(),

            // App
            new Demo\Bundle\ApiBundle\DemoApiBundle(),
            new Demo\Bundle\ThumbnailBundle\DemoThumbnailBundle(),
        ];

        if ($this->isDebug()) {
            $bundles = array_merge($bundles, [
                new Symfony\Bundle\DebugBundle\DebugBundle(),
                new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle(),
                new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle(),
                new Sensio\Bundle\DistributionBundle\SensioDistributionBundle(),
                new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle(),
                new JMS\DiExtraBundle\JMSDiExtraBundle(),
                new JMS\AopBundle\JMSAopBundle(),
                new JMS\TranslationBundle\JMSTranslationBundle(),
            ]);
        }

        return $bundles;
    }

    public function getRootDir()
    {
        return __DIR__;
    }

    public function getCacheDir()
    {
        if (isset($_SERVER['VAGRANT']) && $_SERVER['VAGRANT']) {
            return '/var/cache/symfony/demo/'.$this->getEnvironment();
        }

        return dirname(__DIR__).'/var/cache/'.$this->getEnvironment();
    }

    public function getLogDir()
    {
        if (isset($_SERVER['VAGRANT']) && $_SERVER['VAGRANT']) {
            return '/var/logs/symfony/demo';
        }

        return dirname(__DIR__).'/var/logs';
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load($this->getRootDir().'/config/config_'.$this->getEnvironment().'.yml');
    }
}
