<?php

namespace Demo\Behat\Context\Hook;

use Behat\Behat\Context\Context;
use Symfony\Component\Routing\RouterInterface;

/**
 * Class ApiContext
 */
final class ApiContext implements Context
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var string
     */
    private $apiHost;

    /**
     * ApiContext constructor.
     *
     * @param RouterInterface $router
     * @param string          $apiHost
     */
    public function __construct(RouterInterface $router, $apiHost)
    {
        $this->router  = $router;
        $this->apiHost = $apiHost;
    }

    /**
     * @BeforeScenario
     */
    public function setRouterHost()
    {
        $context = $this->router->getContext();
        $context->setHost($this->apiHost);

        $this->router->setContext($context);
    }
}
