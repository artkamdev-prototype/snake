console.log("run...")
//
const canvas = document.getElementById('canvas')
// context
const ctx = canvas.getContext('2d')
// grid settings
const scale = 10;
// canvas settings
canvas.width = 10 * scale;
canvas.height = 10 * scale;
// 
const directions = {
    north: { x: 0, y: -1 },
    south: { x: 0, y: 1 },
    east: { x: 1, y: 0 },
    west: { x: -1, y: 0 },
}
//
const init = {
    inputDirection: directions.east,
    snake: [
        {x:1, y:1 },
        {x:1, y:2},
        {x:1, y:3}
    ],
    apples: { x: 4, y: 1 }
}
//
let inputDirection = init.inputDirection;
let snake = init.snake
let apples = init.apples;
//
const lerp = (min) => max => value => (max-min) * value + min
const lerpRGB = lerp(255)(100)

const drawSegment = (s) => (x) => (i) => {
    // console.log(lerpRGB(i) )
    // ctx.fillStyle = `rgb(${lerpRGB(i)}, 0, 0)`
    ctx.fillStyle = `rgb(222, 0, 0)`
    ctx.fillRect(x.x * scale, x.y * scale, 1 * scale, 1 * scale)
}
//
const drawApple = (d) => {
    console.log("drawApple",d)
    ctx.fillStyle = '#00FF00'
    ctx.fillRect(d.x * scale, d.y * scale, 1 * scale, 1 * scale)
}
//
const draw = (x, y) => {
    // clear canvas
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // draw apples
    drawApple(apples)
    // draw snake
    snake.forEach((x, i) => drawSegment(snake)(x)(i))
    // draw points
    console.log(JSON.stringify(apples))
}
//
const vectorAdd = v1 => v2 => {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
    }
}
//
const isVectorEqual = v1 => v2 => 
    v1.x === v2.x && v1.x === v2.x
//
const outerRange = v => 
    v.x < 0 || v.x > 10 || v.y < 0 || v.y > 10
//
const moveSnakeBody = (s) => s
    .map((x, i) => i === 0
        ? x
        : s[i-1])
//
const getRandomInt = (max) =>  Math.floor(Math.random() * max);
//
const snakeGrow = s => s.push(s[s.length-1])

//
// const createGridArray = row => col => 
// const freeVectors = source => reserved => 
const newAppleVector = (a) => {
    return {
        x: getRandomInt(scale),
        y: getRandomInt(scale)
    }
}
//
const snakeUpdate = () => {
    const newSnakeHeadVector = vectorAdd(snake[0])(inputDirection)

    const isHeadHitBorder = outerRange(newSnakeHeadVector)

    const snakeHitApple = isVectorEqual(newSnakeHeadVector)(apples)

    snake = moveSnakeBody(snake)

    if(snakeHitApple) {
        snakeGrow(snake)
        apples = newAppleVector()
    }


    // SnakeHitApple.length > 0 
    //     ? snakeEatApple(snake)(snakeBodyEndVector)(apples)(SnakeHitApple)
    //     : null

    snake[0] = newSnakeHeadVector
}
//
const update = () =>  {
    snakeUpdate()  
}
//
let lastRenderTime = 0
const main = (currentTime) => {
    // stable update/draw
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 3000
    if (secondsSinceLastRender < 1) return
    lastRenderTime = currentTime
    // call
    update()
    draw()
}
// start loop
update()
draw()
window.requestAnimationFrame(main)
// key listener
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case 'ArrowUp': inputDirection = directions.north; break;
        case 's': case 'ArrowDown': inputDirection = directions.south; break;
        case 'a': case 'ArrowLeft': inputDirection = directions.west; break;
        case 'd': case 'ArrowRight': inputDirection = directions.east; break;
    }
})

