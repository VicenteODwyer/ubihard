let engine = Matter.Engine.create()

let rederer = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        height: 600,
        width: 800,
        wireframes:false,
        background: './imagenes/Sprites/bg.png'
    }
});

let ground = Matter.Bodies.rectangle(400, 600, 800, 195, {
    isStatic: true,
    fillStyle: 'brawn'
})
let ground2 = Matter.Bodies.rectangle(100, 500, 200, 50, {
    isStatic: true,
    fillStyle: 'brawn'
})
let woodplanc = Matter.Bodies.rectangle(500, 400, 202, 19, {
    render: {
        sprite:{
            texture: './imagenes/Sprites/wood2.png'
        }
    }
})
let woodcube = Matter.Bodies.rectangle(600, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
let woodcube2 = Matter.Bodies.rectangle(400, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
let box = Matter. Bodies.rectangle(500, 200, 50, 50)


let chochan = Matter.Bodies.circle(500, 490, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
let chochan2 = Matter.Bodies.circle(500, 390, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
let ball_pos = {
    x: 100,
    y: 400
}

let ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 50, {
    render: {
        sprite:{
            texture: './Imagenes/Sprites/Pajarogordo.png'
        }
        
    },
})
let sling = Matter.Constraint.create({
    pointA: {
        x: ball_pos.x,
        y:ball_pos.y
    },
    bodyB: ball,
    stiffness: 0.05
})

let mouseConstraint = Matter.MouseConstraint.create(engine,{
    mouse: Matter.Mouse.create(rederer.canvas)
})

rederer.mouse = mouseConstraint 

Matter.World.add(engine.world, [woodcube2 ,woodcube, woodplanc, ground2, ground, chochan, chochan2,ball, sling, mouseConstraint])
    
let isFired = false

Matter.Events.on(mouseConstraint, 'enddrag', function(event){
    if(event.body === ball){
        isFired = true
    }
})

Matter.Events.on(engine, 'afterUpdate', function(event){
    let dist_x = Math.abs(ball.position.x - ball_pos.x)
    let dist_y = Math.abs(ball.position.y - ball_pos.y)
    if(isFired && dist_x < 20 && dist_y < 20){
        ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20,{
            render: {
                sprite:{
                    texture: './Imagenes/Sprites/Pajarogordo.png'
                }
                
            }
        })
        sling.bodyB = ball
        Matter.World.add(engine.world, ball)
        isFired = false
    }
})

Matter.Render.run(rederer)
Matter.Runner.run(engine)