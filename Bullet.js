function Bullet(ship){
    this.position = createVector(ship.position.x, ship.position.y);
    this.heading = ship.heading;
    this.velocity = p5.Vector.fromAngle(this.heading - (PI / 2)).mult(5);
    this.hit = false;

    this.render = function(){
        push();
        translate(this.position.x, this.position.y);
        rotate(this.heading);
        this.update();
        noFill();
        stroke(255);
        strokeWeight(5);
        point(0, 0);
        pop();
    }

    this.update = function(){
        this.position.add(this.velocity);
    }

    this.isOffScreen = function(){
        if(this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
            
            return true;
        }
        else return false;
    }

    this.hits = function(asteroid){
        for(var i = 0; i < asteroid.vertices.length; i++){
            var pointA = createVector(asteroid.vertices[i % asteroid.vertices.length][0], asteroid.vertices[i % asteroid.vertices.length][1]),
            pointB = createVector(asteroid.vertices[(i + 1) % asteroid.vertices.length][0], asteroid.vertices[(i + 1) % asteroid.vertices.length][1]);

            //Taking translation into consideration
            pointA.x += asteroid.position.x;
            pointA.y += asteroid.position.y;
            pointB.x += asteroid.position.x;
            pointB.y += asteroid.position.y;

            push();
            strokeWeight(4);
            stroke(255, 0, 0);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
            pop();

            if(dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y) < asteroid.r / 1.5) return true;

            if(this.pointLine(this.position.x, this.position.y, pointA.x, pointA.y, pointB.x, pointB.y)) return true;
        }
    }

    this.pointLine = function(pX, pY, x1, y1, x2, y2){
        // console.log("Hello");
        let d1 = dist(pX, pY, x1, y1),
        d2 = dist(pX, pY, x2, y2),
        buffer = 0.3;
        return ((d1 + d2) >= dist(x1, y1, x2, y2) - buffer && (d1 + d2) <= dist(x1, y1, x2, y2) + buffer);
    }
}