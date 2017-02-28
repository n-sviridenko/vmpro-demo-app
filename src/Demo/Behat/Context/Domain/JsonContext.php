<?php

namespace Demo\Behat\Context\Domain;

use Assert\Assertion;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Assert\InvalidArgumentException;
use Behat\Gherkin\Node\PyStringNode;
use Symfony\Component\PropertyAccess\PropertyAccess;

use Demo\Behat\Service\SharedStorage;

/**
 * Class JsonContext
 */
class JsonContext implements Context
{
    /**
     * @var SharedStorage
     */
    private $sharedStorage;

    /**
     * JsonContext constructor.
     *
     * @param SharedStorage $sharedStorage
     */
    public function __construct(SharedStorage $sharedStorage)
    {
        $this->sharedStorage = $sharedStorage;
    }

    /**
     * @Then the JSON node :path should be equal to :text
     */
    public function theJsonNodeShouldBeEqualTo($path, $text)
    {
        Assertion::eq($this->getJsonNode($path), $text);
    }

    /**
     * @Then the JSON nodes should be equal to:
     */
    public function theJsonNodesShoudBeEqualTo(TableNode $table)
    {
        foreach ($table->getRowsHash() as $path => $text) {
            $this->theJsonNodeShouldBeEqualTo($path, $text);
        }
    }

    /**
     * @Then the JSON node :path should be null
     */
    public function theJsonNodeShouldBeNull($path)
    {
        Assertion::null($this->getJsonNode($path));
    }

    /**
     * @Then the JSON node :path should be true
     */
    public function theJsonNodeShouldBeTrue($path)
    {
        Assertion::true($this->getJsonNode($path));
    }

    /**
     * @Then the JSON node :path should be false
     */
    public function theJsonNodeShouldBeFalse($path)
    {
        Assertion::false($this->getJsonNode($path));
    }

    /**
     * @Then the JSON node :path should be equal to the string :text
     */
    public function theJsonNodeShouldBeEqualToTheString($path, $text)
    {
        Assertion::same($this->getJsonNode($path), $text);
    }

    /**
     * @Then the JSON node :path should be equal to the number :number
     */
    public function theJsonNodeShouldBeEqualToTheNumber($path, $number)
    {
        $value = $this->getJsonNode($path);

        try {
            Assertion::same($value, (float) $number);
        } catch (InvalidArgumentException $e) {
            Assertion::same($value, (int) $number);
        }
    }

    /**
     * @Then the JSON node :path should be equal to the node:
     */
    public function theJsonNodeShouldBeEqualToTheNode($path, PyStringNode $node)
    {
        $value    = $this->getJsonNode($path);
        $expected = $this->decodeJson($node->getRaw());

        Assertion::same(json_encode($value), json_encode($expected));
    }

    /**
     * @Then the JSON node :path should be equal to the node :comparePath
     */
    public function theJsonNodeShouldBeEqualToTheNodeByPath($path, $comparePath)
    {
        $value    = $this->getJsonNode($path);
        $expected = $this->getJsonNode($comparePath);

        Assertion::same(json_encode($value), json_encode($expected));
    }

    /**
     * @Then the JSON node :path should have :count element(s)
     */
    public function theJsonNodeShouldHaveElements($path, $count)
    {
        Assertion::eq(count((array) $this->getJsonNode($path)), $count);
    }

    /**
     * @Then the JSON node :path should contain :text
     */
    public function theJsonNodeShouldContain($path, $text)
    {
        Assertion::contains((string) $this->getJsonNode($path), $text);
    }

    /**
     * @Then the JSON nodes should contain:
     */
    public function theJsonNodesShoudContain(TableNode $table)
    {
        foreach ($table->getRowsHash() as $path => $text) {
            $this->theJsonNodeShouldContain($path, $text);
        }
    }

    /**
     * @Then the JSON node :path should not contain :text
     */
    public function theJsonNodeShouldNotContain($path, $text)
    {
        $value = (string) $this->getJsonNode($path);

        $this->assertNot(function () use ($value, $text) {
            Assertion::contains($value, $text);
        }, sprintf('Value "%s" contains "%s".', $value, $text));
    }

    /**
     * @Then the JSON nodes should not contain:
     */
    public function theJsonNodesShoudNotContain(TableNode $table)
    {
        foreach ($table->getRowsHash() as $path => $text) {
            $this->theJsonNodeShouldNotContain($path, $text);
        }
    }
    
    /**
     * @Then the JSON node :path should exist
     */
    public function theJsonNodeShouldExist($path)
    {
        $this->getJsonNode($path);
    }

    /**
     * @Then the JSON node :path should not exist
     */
    public function theJsonNodeShouldNotExist($path)
    {
        $this->assertNot(function () use ($path) {
            return $this->theJsonNodeShouldExist($path);
        }, sprintf('The node "%s" exists.', $path));
    }

    /**
     * @Then dump decoded json
     */
    public function dumpDecodedJson()
    {
        dump($this->getDecodedJson());
    }

    /**
     * @param string $json
     *
     * @return mixed
     * @throws \Exception
     */
    private function decodeJson($json)
    {
        $data = json_decode($json);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('The JSON is not a valid');
        }

        return $data;
    }

    /**
     * @return mixed
     */
    private function getDecodedJson()
    {
        return $this->decodeJson($this->sharedStorage->get('json'));
    }

    /**
     * @param string $path
     *
     * @return mixed
     * @throws \Exception
     */
    private function getJsonNode($path)
    {
        $data = $this->getDecodedJson();

        if ($path === 'root') {
            return $data;
        }

        try {
            $accessor = PropertyAccess::createPropertyAccessor();

            return $accessor->getValue($data, $path);
        } catch (\Exception $e) {
            throw new \Exception(sprintf('Failed to evaluate the path "%s"', $path));
        }
    }

    /**
     * @param callable $callbable
     * @param string   $errorMessage
     *
     * @throws \Exception
     */
    private function assertNot(callable $callbable, $errorMessage)
    {
        try {
            $callbable();
        } catch (\InvalidArgumentException $e) {
            return;
        }

        throw new \Exception($errorMessage);
    }
}
