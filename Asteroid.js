function Asteroid(x, y, r){
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult((1 / r) * 22); //Size of the asteroid and the megnitude of the velocity vector of the asteroid are reciprocal to each other
    this.r = r;
    this.vertices = [];
    this.gotHit = false;

    //createShape function is to call once to create the shape by setting up the vertices randomly
    this.createShape = function(){
        for(var a = 0; a < 360; a += random(20, 60)){
            let dx = random(this.r - 20, this.r) * cos(radians(a)),
            dy = random((this.r / 2), this.r) * sin(radians(a));
            this.vertices.push([dx, dy]);
        }
    }

    //render function is to call everytime we want to draw the particular instance of the shape on the screen
    this.render = function(){
        push();
        this.update();
        this.edge();
        translate(this.position.x, this.position.y);
        stroke(255);
        if(this.gotHit) fill("orange");
        else noFill();
        beginShape()
        for(var i = 0; i < this.vertices.length; i += 1){
            vertex(this.vertices[i][0], this.vertices[i][1])
        }
        endShape(CLOSE);
        pop();
    }

    //Updates the position of the custom shape based on the random velocity vector and also updates the angle of rotation
    this.update = function(){
        this.position.add(this.velocity);
    }

    this.edge = function(){
        if(this.position.y + this.r < 0){
            this.position.y = height + this.r;
            this.position.x = width - this.position.x;
        }
        if(this.position.y - this.r > height){
            this.position.x = width - this.position.x;
            this.position.y = -this.r;
        }
        if(this.position.x - this.r > width){
            this.position.x = -this.r;
            this.position.y = height - this.position.y;
        }
        if(this.position.x + this.r < 0){
            this.position.x = width + this.r;
            this.position.y = height - this.position.y;
        }
    }
}