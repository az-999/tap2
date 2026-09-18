<?php

namespace App\Service;

use Gregwar\Captcha\CaptchaBuilder;
use Gregwar\Captcha\PhraseBuilder;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Geometry\Factories\CircleFactory;
use Intervention\Image\Image;
use Intervention\Image\ImageManager;

class Captcha {
    public $manager;
    public $builder;
    public Image $top;
    public Image $bottom;
    public int $position;
    public $phrase;

    const CANVAS_HEIGHT = 200;
    const CANVAS_WIDTH = 4000;

    const CANVAS_BG = "#181833";
    const TEXT_COLOR = "#33CC66";

    public function __construct() {
        $this->manager = new ImageManager(new Driver());
        $this->builder = new CaptchaBuilder(null, new PhraseBuilder(6));
        $this->generate();
    }

    private function generate()
    {
        $image = $this->createImage();
        $this->bottom = clone $image;
        $this->top = clone $image;
        $this->bottom->crop(2000, 50, 0, 50);
        $this->position = random_int(0, 160) * 10;  // ensures steps of 10
        $this->top->crop(400, 50, $this->position, 0);
        $this->position = 2000 - $this->position;

        $this->builder->setBackgroundColor(0x18, 0x18, 0x33);
        $this->builder->setTextColor(0x33, 0xCC, 0x66);
        $this->phrase = $this->builder->getPhrase();
        $this->builder->build(200, 80);
    }

    private function createImage()
    {
        $image = $this->manager->create(self::CANVAS_WIDTH, self::CANVAS_HEIGHT)->fill(self::CANVAS_BG);

        foreach (range(1, 50) as $x) {
            $image->drawCircle(
                random_int(0, self::CANVAS_WIDTH),   // x
                random_int(0, self::CANVAS_HEIGHT),  // y
                function (CircleFactory $circle) {
                    $circle->radius(random_int(20, (self::CANVAS_HEIGHT/2)-10)); // radius of circle in pixels
                    $circle->background($this->colours()); // background color
                    $circle->border('444444', 1); // border color & size
                });
        }

        $image->resize(self::CANVAS_WIDTH / 2, self::CANVAS_HEIGHT / 2);

        return $image;
    }

    private function colours()
    {
        return sprintf("rgba(%s, %s, %s, %s)",
            random_int(0, 255),  // range for R
            random_int(0, 255),  // range for G
            random_int(0, 255),  // range for B
            (rand(1, 8) / 10)    // range for opacity
        );
    }
}
