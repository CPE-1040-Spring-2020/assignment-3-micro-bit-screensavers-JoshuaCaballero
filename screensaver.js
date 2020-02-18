let sleep = false
let gesture: Gesture = Gesture.Shake
let timeout = 0
function ss1() {
    basic.clearScreen()
    led.plot(2, 2)
    for (let i = 0; i <= 4 - 1; i++) {
        led.plot(i, 0)
        led.plot(4, i)
        led.plot(4 - i, 4)
        led.plot(0, 4 - i)
        basic.pause(100)
        if (led.point(0, 0)) {
            for (let x = 1; x < 4; x++) {
                for (let y = 1; y < 4; y++) {
                    led.plot(x, y)
                }
            }
            basic.pause(100)
        } else {
            for (let x = 1; x < 4; x++) {
                for (let y = 1; y < 4; y++) {
                    led.unplot(x, y)
                }
            }
            led.plot(2, 2)
        }
        led.unplot(i, 0)
        led.unplot(4, i)
        led.unplot(4 - i, 4)
        led.unplot(0, 4 - i)
    }
}
function ss2() {
    basic.clearScreen()
    for (let x = 0; x <= 3 - 1; x++) {
        for (let y = 0; y <= 3 - 1; y++) {
            led.plot(x * 2, y * 2)
        }
    }
    led.plot(1, 1)
    led.plot(1, 3)
    led.plot(3, 1)
    led.plot(3, 3)
    for (let index = 0; index < 2; index++) {
        led.fadeOut(500)
        led.toggleAll()
        led.fadeIn(500)
    }
}
function ss3() {
    basic.clearScreen()
    for (let x = 0; x <= 5; x++) {
        for (let y = 0; y <= 5 - 1; y++) {
            led.plot(x, y)
            basic.pause(50)
        }
    }
    for (let y = 0; y <= 5; y++) {
        for (let x = 0; x <= 5 - 1; x++) {
            led.unplot(x, y)
            basic.pause(50)
        }
    }
}
function ss4() {
    basic.clearScreen()
    let x = Math.randomRange(0, 4)
    for (let y = 0; y <= 5 - 1; y++) {
        led.plot(x, y)
        basic.pause(75)
        led.unplot(x, y)
    }
}
function ss5() {
    basic.clearScreen()
    for (let x = 0; x <= 5 - 1; x++) {
        led.plot(x, 0)
        led.plot(x, 4)
        basic.pause(100)
        led.plot(x, 1)
        led.plot(x, 3)
        basic.pause(100)
        led.plot(x, 2)
        basic.pause(100)
    }
    for (let x = 0; x <= 5 - 1; x++) {
        led.unplot(x, 2)
        basic.pause(100)
        led.unplot(x, 1)
        led.unplot(x, 3)
        basic.pause(100)
        led.unplot(x, 0)
        led.unplot(x, 4)
        basic.pause(100)
    }
}
function work() {
    let i = 1
    let j = 1
    while (!sleep) {
        let k = i + j
        basic.showNumber(k)
        j = i
        i = k
    }
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    sleep = true
    timeout = input.runningTime()
})
input.onGesture(Gesture.Shake, function () {
    gesture = Gesture.Shake
    timeout = input.runningTime()
})
input.onGesture(Gesture.LogoUp, function () {
    gesture = Gesture.LogoUp
    timeout = input.runningTime()
})
input.onGesture(Gesture.LogoDown, function () {
    gesture = Gesture.LogoDown
    timeout = input.runningTime()
})
input.onGesture(Gesture.TiltLeft, function () {
    gesture = Gesture.TiltLeft
    timeout = input.runningTime()
})
input.onGesture(Gesture.TiltRight, function () {
    gesture = Gesture.TiltRight
    timeout = input.runningTime()
})
input.onButtonPressed(Button.B, function () {
    sleep = false
    gesture = null
})
basic.forever(function () {
    if (sleep && gesture == Gesture.Shake) {
        ss1()
    }
    else if (sleep && gesture == Gesture.LogoUp) {
        ss2()
    }
    else if (sleep && gesture == Gesture.LogoDown) {
        ss3()
    }
    else if (sleep && gesture == Gesture.TiltLeft) {
        ss4()
    }
    else if (sleep && gesture == Gesture.TiltRight) {
        ss5()
    }
    else {
        work()
    }
    if (input.runningTime() - timeout >= 10000) {
        led.fadeOut(250)
        basic.clearScreen()
        gesture = null
        led.setBrightness(255)
    }
})
