import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const CanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; // Помещаем canvas позади всего остального контента
`;

const StarryBackground: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const hue = 217;
    const stars: Star[] = [];
    const maxStars = 400; // Уменьшение количества звезд
    let count = 0;

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    // @ts-ignore
    const gradient2 = ctx2.createRadialGradient(
      half,
      half,
      0,
      half,
      half,
      half,
    );
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, 'transparent');
    // @ts-ignore
    ctx2.fillStyle = gradient2;
    // @ts-ignore
    ctx2.beginPath();
    // @ts-ignore
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    // @ts-ignore
    ctx2.fill();

    function random(min: number, max?: number) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }
      // @ts-ignore
      if (min > max) {
        const hold = max;
        max = min;
        // @ts-ignore
        min = hold;
      }
      // @ts-ignore
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x: number, y: number) {
      const max = Math.max(x, y);
      return Math.round(Math.sqrt(max * max + max * max)) / 2;
    }

    class Star {
      orbitRadius: number;
      radius: number;
      orbitX: number;
      orbitY: number;
      timePassed: number;
      speed: number;
      alpha: number;

      constructor() {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 50000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      }

      draw() {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }
        // @ts-ignore
        ctx.globalAlpha = this.alpha;
        // @ts-ignore
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius,
        );
        this.timePassed += this.speed;
      }
    }

    for (let i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      // @ts-ignore
      ctx.globalCompositeOperation = 'source-over';
      // @ts-ignore
      ctx.globalAlpha = 0.8;
      // @ts-ignore
      ctx.fillStyle = '#000';
      // @ts-ignore
      ctx.fillRect(0, 0, w, h);
      // @ts-ignore
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }

    animation();

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <CanvasWrapper>
      <canvas id="canvas"></canvas>
    </CanvasWrapper>
  );
};

export default StarryBackground;
