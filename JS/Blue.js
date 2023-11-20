let engine = Matter.Engine.create()//crea el motor para las fisicas y funciones del JS

let rederer = Matter.Render.create({//crea el escenario
    element: document.body,
    engine: engine,//establece el motor a usar
    options: {
        height: 695 ,
        width: 1480,
        wireframes:false,
        background: './imagenes/Sprites/bg.png'//fondo
    },
})
//a 
let ground = Matter.Bodies.rectangle(740, 600, 1480 , 195, {
    isStatic: true,
    fillStyle: 'brawn'
})
let ground2 = Matter.Bodies.rectangle(100, 500, 200, 50, {
    isStatic: true,
    fillStyle: 'brawn'
})
let woodplanc = Matter.Bodies.rectangle(1200, 400, 202, 19, {
    render: {
        sprite:{
            texture: './imagenes/Sprites/wood2.png'
        }
    }
})
let woodcube = Matter.Bodies.rectangle(1100, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
let woodcube2 = Matter.Bodies.rectangle(1300, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
let box = Matter. Bodies.rectangle(500, 200, 50, 50)


let chochan = Matter.Bodies.circle(1200, 490, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
let chochan2 = Matter.Bodies.circle(1200, 390, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
let ball_pos = {
    x: 150,
    y: 400
}

//creando pajaro azul
ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20,{
    render: {
        sprite:{//imagen
            texture: './Imagenes/Sprites/PajaroAzul.png'
        }    
    },//fiscas
    density: 0.001, // densidad del círculo
    friction: 0.01, // fricción del círculo
    frictionAir: 0.01, // fricción del aire del círculo
    restitution: 0.8, // restitución del círculo (rebote)
    inertia: Infinity
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
        //creando pajaro azul
    ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20,{
        render: {
            sprite:{//imagen
                texture: './Imagenes/Sprites/PajaroAzul.png'
            }    
        },//fiscas
        density: 0.001, // densidad del círculo
        friction: 0.01, // fricción del círculo
        frictionAir: 0.01, // fricción del aire del círculo
        restitution: 0.8, // restitución del círculo (rebote)
        inertia: Infinity
    })  
        sling.bodyB = ball
        Matter.World.add(engine.world, ball)
        isFired = false

    }
})

Matter.Render.run(rederer)
Matter.Runner.run(engine)