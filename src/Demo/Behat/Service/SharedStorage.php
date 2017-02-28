<?php
declare(strict_types=1);

namespace Demo\Behat\Service;

/**
 * Class SharedStorage
 */
class SharedStorage
{
    /**
     * @var array
     */
    private $clipboard = [];

    /**
     * @var string|null
     */
    private $latestKey = null;

    /**
     * @param string $key
     *
     * @return mixed
     */
    public function get(string $key)
    {
        if (!$this->has($key)) {
            throw new \InvalidArgumentException(sprintf('There is no current resource for "%s".', $key));
        }

        return $this->clipboard[$key];
    }

    /**
     * @param string $key
     *
     * @return bool
     */
    public function has(string $key): bool
    {
        return isset($this->clipboard[$key]);
    }

    /**
     * @param string $key
     * @param mixed  $resource
     */
    public function set(string $key, $resource)
    {
        $this->clipboard[$key] = $resource;
        $this->latestKey       = $key;
    }

    /**
     * @param string $key
     */
    public function remove(string $key)
    {
        if ($this->has($key)) {
            unset($this->clipboard[$key]);
        }
    }

    /**
     * @return mixed
     */
    public function getLatestResource()
    {
        if (!$this->has($this->latestKey)) {
            throw new \InvalidArgumentException(sprintf('There is no latest resource.', $this->latestKey));
        }

        return $this->get($this->latestKey);
    }

    /**
     * @param array $clipboard
     *
     * @throws \RuntimeException
     */
    public function setClipboard(array $clipboard)
    {
        $this->clipboard = $clipboard;
    }
}
