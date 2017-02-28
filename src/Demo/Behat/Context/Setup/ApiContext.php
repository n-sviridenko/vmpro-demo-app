<?php

namespace Demo\Behat\Context\Setup;

use Behat\Behat\Context\Context;
use Symfony\Component\Security\Core\User\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManagerInterface;

use Demo\Behat\Service\SharedStorage;

/**
 * Class ApiContext
 */
class ApiContext implements Context
{
    /**
     * @var JWTManagerInterface
     */
    private $jwtManager;

    /**
     * @var SharedStorage
     */
    private $sharedStorage;

    /**
     * ApiContext constructor.
     *
     * @param JWTManagerInterface $jwtManager
     * @param SharedStorage       $sharedStorage
     */
    public function __construct(JWTManagerInterface $jwtManager, SharedStorage $sharedStorage)
    {
        $this->jwtManager    = $jwtManager;
        $this->sharedStorage = $sharedStorage;
    }

    /**
     * @Given /^I am authenticated in api as (user "[^"]+")$/
     */
    public function iAmAuthenticatedInApiAsUser(User $user)
    {
        $jwt = $this->jwtManager->create($user);

        $this->sharedStorage->set('jwt_token', $jwt);
    }
}
