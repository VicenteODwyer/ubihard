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
//Crea la base para el juego
let ground = Matter.Bodies.rectangle(740, 600, 1480 , 195, {
    isStatic: true,
    fillStyle: 'brawn'
})
//base de la resortera
let ground2 = Matter.Bodies.rectangle(100, 500, 200, 50, {
    isStatic: true,
    fillStyle: 'brawn'
})
//cubo de madera 1
let woodcube = Matter.Bodies.rectangle(1100, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
//cubo de madera 2
let woodcube2 = Matter.Bodies.rectangle(1120, 550, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
//cubo de madera 3
let woodcube3 = Matter.Bodies.rectangle(1100, 350, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
//cubo de madera 4
let woodcube4 = Matter.Bodies.rectangle(1120, 350, 81, 81,{
    render:{
        sprite:{
            texture: './imagenes/Sprites/wood1.png'
        }
    }
})
//chancho 1
let chochan = Matter.Bodies.circle(1200, 490, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
//chancho 2
let chochan2 = Matter.Bodies.circle(1300, 490, 25,{
    render: {
        sprite:{
            texture: './Imagenes/Sprites/chancho.png'
        }
        
    }
})
//posicion del pajaro
let ball_pos = {
    x: 150,
    y: 400
}

//creando pajaro Gordo
ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20,{
    render: {
        sprite:{//imagen
            texture: './Imagenes/Sprites/PajaroGordo.png'
        }    
    },//fiscas
    density: 0.001, // densidad del círculo
    friction: 0.01, // fricción del círculo
    frictionAir: 0.01, // fricción del aire del círculo
    restitution: 0.8, // restitución del círculo (rebote)
    inertia: Infinity
})

//posicion de la resortera
let sling = Matter.Constraint.create({
    pointA: {
        x: ball_pos.x,
        y:ball_pos.y
    },
    bodyB: ball,
    stiffness: 0.05
})

//funcion para poder usar el mouse
let mouseConstraint = Matter.MouseConstraint.create(engine,{
    mouse: Matter.Mouse.create(rederer.canvas)
})

rederer.mouse = mouseConstraint 

//se agregan los objetos al mundo
Matter.World.add(engine.world, [woodcube4, woodcube3,woodcube2 ,woodcube,ground2, ground,chochan2, chochan,ball, sling, mouseConstraint])
    
let isFired = false

Matter.Events.on(mouseConstraint, 'enddrag', function(event){//detecta la accion del mouse sobre un objeto
    if(event.body === ball){
        isFired = true//indica si se lanzo de la resortera
    }
})

Matter.Events.on(engine, 'afterUpdate', function(event){
    let dist_x = Math.abs(ball.position.x - ball_pos.x)//actualiza la posicion X del objeto
    let dist_y = Math.abs(ball.position.y - ball_pos.y)//actualiza la posicion Y del objeto
    if(isFired && dist_x < 20 && dist_y < 20){
        //creando pajaro Gordo
        ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20,{
            render: {
                sprite:{//imagen
                    texture: './Imagenes/Sprites/PajaroGordo.png'
                }    
            },//fiscas
            density: 0.001, // densidad del círculo
            friction: 0.01, // fricción del círculo
            frictionAir: 0.01, // fricción del aire del círculo
            restitution: 0.8, // restitución del círculo (rebote)
            inertia: Infinity
        })  
        //vuelve a generar un nuevo pajaro en la gomera
        sling.bodyB = ball
        Matter.World.add(engine.world, ball)
        isFired = false
    }
})

Matter.Render.run(rederer)//inicio todos los objetos render
Matter.Runner.run(engine)//inicia el motor de fisicas 