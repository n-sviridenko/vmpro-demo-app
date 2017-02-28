<?php

namespace Demo\Behat\Context\Domain;

use Assert\Assertion;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Behat\Gherkin\Node\PyStringNode;
use Symfony\Component\Routing\Router;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpKernel\KernelInterface;

use Demo\Behat\Service\SharedStorage;

/**
 * Class ApiContext
 */
class ApiContext implements Context
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var RegistryInterface
     */
    private $registry;

    /**
     * @var KernelInterface
     */
    private $kernel;

    /**
     * @var SharedStorage
     */
    private $sharedStorage;

    /**
     * ApiContext constructor.
     *
     * @param RouterInterface             $router
     * @param RegistryInterface           $registry
     * @param KernelInterface             $kernel
     * @param SharedStorage               $sharedStorage
     */
    public function __construct(
        RouterInterface $router,
        RegistryInterface $registry,
        KernelInterface $kernel,
        SharedStorage $sharedStorage
    ) {
        $this->router            = $router;
        $this->registry          = $registry;
        $this->kernel            = $kernel;
        $this->sharedStorage     = $sharedStorage;
    }

    /**
     * @When I send a :method request to :routeName
     */
    public function iSendRequestToRoute($method, $routeName)
    {
        $this->sendRequest($method, $routeName);
    }

    /**
     * @When I send a :method request to :routeName with parameters:
     */
    public function iSendRequestToRouteWithParameters($method, $routeName, TableNode $node)
    {
        $parameters = $node->getRowsHash();

        $this->sendRequest($method, $routeName, $parameters);
    }

    /**
     * @When I send a :method request to :routeName with body:
     */
    public function iSendRequestToRouteWithBody($method, $routeName, PyStringNode $node)
    {
        $data = json_decode($node->getRaw(), true);

        $this->sendRequest($method, $routeName, [], $data);
    }

    /**
     * @When I prepare a :method request to :routeName with parameters:
     */
    public function iPrepareRequestToRouteWithParameters($method, $routeName, TableNode $node)
    {
        $parameters = $node->getRowsHash();

        $this->createRequest($method, $routeName, $parameters);
    }

    /**
     * @When I send it with body:
     */
    public function iSendItWithBody(PyStringNode $node)
    {
        $request = $this->getRequest();
        $data    = json_decode($node->getRaw(), true);

        $request->request->replace($data);

        $this->processRequest($request);
    }

    /**
     * @Then the response status code should be :code
     */
    public function theResponseStatusCodeShouldBe($code)
    {
        Assertion::eq($this->getResponse()->getStatusCode(), $code);
    }

    /**
     * @Then print current URL
     */
    public function printCurrentUrl()
    {
        echo $this->getRequest()->getUri();
    }

    /**
     * @Then print last response
     */
    public function printLastResponse()
    {
        echo (
            $this->getRequest()->getUri()."\n\n".
            $this->getResponse()->getContent()
        );
    }

    /**
     * @param string $method
     * @param string $routeName
     * @param array  $parameters
     * @param array  $data
     *
     * @return Response
     */
    private function sendRequest($method, $routeName, array $parameters = [], array $data = [])
    {
        $request = $this->createRequest($method, $routeName, $parameters, $data);

        return $this->processRequest($request);
    }

    /**
     * @param string $method
     * @param string $routeName
     * @param array  $parameters
     * @param array  $data
     *
     * @return Request
     */
    private function createRequest($method, $routeName, array $parameters = [], array $data = [])
    {
        $uri = $this->getUri($routeName, $parameters);

        return $this->createRawRequest($method, $uri, $data);
    }

    /**
     * @param string $method
     * @param string $uri
     * @param array  $data
     *
     * @return Request
     */
    private function createRawRequest($method, $uri, array $data = [])
    {
        $headers = [];
        $token   = $this->getJwtToken();

        if (!is_null($token)) {
            $headers['Authorization'] = sprintf('Bearer %s', $token);
        }

        $request = Request::create($uri, $method, $data);
        $request->headers->add($headers);

        $this->sharedStorage->set('api_request', $request);

        return $request;
    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    private function processRequest(Request $request)
    {
        /** @var EntityManagerInterface $entityManager */
        $entityManager = $this->registry->getManager();
        $entityManager->clear(); // to force all param converters etc. to use a fresh data

        $response = $this->kernel->handle($request);

        $this->sharedStorage->set('api_response', $response);
        $this->sharedStorage->set('json', $response->getContent());

        return $response;
    }

    /**
     * @param string $routeName
     * @param array  $parameters
     *
     * @return string
     */
    private function getUri($routeName, array $parameters = [])
    {
        return $this->router->generate($routeName, $parameters, Router::ABSOLUTE_URL);
    }

    /**
     * @return string|null
     */
    private function getJwtToken()
    {
        return $this->sharedStorage->has('jwt_token') ? $this->sharedStorage->get('jwt_token') : null;
    }

    /**
     * @return Request
     */
    private function getRequest()
    {
        return $this->sharedStorage->get('api_request');
    }

    /**
     * @return Response
     */
    private function getResponse()
    {
        return $this->sharedStorage->get('api_response');
    }
}
