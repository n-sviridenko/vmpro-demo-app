<?php
declare(strict_types=1);

namespace Demo\Bundle\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\FOSRestController;

use Demo\Bundle\ApiBundle\Form\Type\VideoGenerateThumbnailType;
use Demo\Bundle\ThumbnailBundle\Generator\ThumbnailGeneratorParams;

/**
 * Class VideoController
 */
class VideoController extends FOSRestController
{
    /**
     * @return Response
     */
    public function getVideosAction(): Response
    {
        $videoManagerId = $this->getParameter('vmpro_vm_id');
        $videos         = $this->get('vmpro_api.client')->getVideos($videoManagerId);

        $view = $this->view($videos);

        return $this->handleView($view);
    }

    /**
     * @return Response
     *
     * @Post("/videos/{videoId}/generate-thumbnail")
     */
    public function postVideosGenerateThumbnailAction(string $videoId, Request $request): Response
    {
        $params = new ThumbnailGeneratorParams();
        $params->setVideoId($videoId);

        $form = $this->createForm(VideoGenerateThumbnailType::class, $params);
        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            $view = $this->view($form, Response::HTTP_BAD_REQUEST);
        } else {
            $thumbnailPath = $this->get('demo.thumbnail.generator.thumbnail')->generateThumbnail($params);
            $thumbnailUrl  = 'http://'.$this->getParameter('uploads_host').'/'.$thumbnailPath;

            $view = $this->view(['url' => $thumbnailUrl]);
        }

        return $this->handleView($view);
    }
}
