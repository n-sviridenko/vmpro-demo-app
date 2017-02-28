<?php

namespace Demo\Behat\Context\Transform;

use Behat\Behat\Context\Context;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\User\UserProviderInterface;

/**
 * Class UserContext
 */
final class UserContext implements Context
{
    /**
     * @var UserProviderInterface
     */
    private $userProvider;

    /**
     * UserContext constructor.
     *
     * @param UserProviderInterface $userProvider
     */
    public function __construct(UserProviderInterface $userProvider)
    {
        $this->userProvider = $userProvider;
    }

    /**
     * @Transform :user
     * @Transform /^user "([^"]+)"$/
     */
    public function getUserByEmail($username)
    {
        return $this->userProvider->loadUserByUsername($username);
    }
}
