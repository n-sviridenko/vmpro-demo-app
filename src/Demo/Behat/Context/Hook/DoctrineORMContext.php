<?php

namespace Demo\Behat\Context\Hook;

use Behat\Behat\Context\Context;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;

/**
 * Class DoctrineORMContext
 */
final class DoctrineORMContext implements Context
{
    /**
     * @var RegistryInterface
     */
    private $registry;

    /**
     * DoctrineORMContext constructor.
     *
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * @BeforeScenario
     */
    public function purgeDatabase()
    {
        /** @var EntityManagerInterface $entityManager */
        $entityManager = $this->registry->getManager();

        $connection = $entityManager->getConnection();
        $connection->getConfiguration()->setSQLLogger(null);

        $connection->query('SET FOREIGN_KEY_CHECKS=0');

        $purger = new ORMPurger($entityManager);
        $purger->setPurgeMode(ORMPurger::PURGE_MODE_TRUNCATE);
        $purger->purge();

        $connection->query('SET FOREIGN_KEY_CHECKS=1');

        $entityManager->clear();
    }
}
