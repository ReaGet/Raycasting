import Ray from "./ray.js";

export default class Raycasting {
  constructor(pos) {
    this.pos = pos;
    this.rays = [];
    for (let i = 0; i < 360; i += 1) {
      let ray = new Ray(pos, i);
      this.rays.push(ray);
    }

    this.intersections = [];
  }

  touch(walls) {
    this.intersections = [];
    this.rays.forEach(ray => {
      let closest = null;
      let max = Infinity;
      walls.forEach(wall => {
        const p = ray.touch(wall);

        if (p) {
          let dx = p.x - this.pos.x;
          let dy = p.y - this.pos.y;

          let len = Math.sqrt(dx * dx + dy * dy);

          if (len < max) {
            max = len;
            closest = p;
          }
        }
        // if (p) {
        //   this.intersections.push(p);
        // }
      });

      if (closest) {
        this.intersections.push(closest);
      }
    });
  }

  update(newPos) {
    this.pos = newPos;
    this.rays.forEach(ray => {
      ray.update(newPos)
    });
  }

  render(ctx) {
    // this.rays.forEach(ray => {
    //   ray.render(ctx);
    // });

    this.intersections.forEach(p => {
      // ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
      ctx.beginPath();
      // ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(p.x, p.y);
      ctx.closePath();
      ctx.stroke();
    });
  }
}