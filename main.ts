function wForward () {
    wcoord(WMove)
    if (95 != led.pointBrightness(wx, wy - 2)) {
        bright = 255
        led.unplot(wx, wy)
        basic.pause(500)
        led.plotBrightness(wx, wy - 2, bright)
        WHITE[WMove * 2 + 1] = wy - 2
        wcoord(WMove)
    } else {
        wBlink(WMove)
    }
}
input.onButtonPressed(Button.A, function () {
    WMove += 1
    if (WMove > 2) {
        WMove = 0
    }
    wcoord(WMove)
    // captured!
    // 
    if (wx == -1) {
        WMove += 1
        if (WMove > 2) {
            WMove = 0
        }
    }
    wcoord(WMove)
    // captured!
    // 
    if (wx == -1) {
        WMove += 1
        if (WMove > 2) {
            WMove = 0
        }
    }
    wcoord(WMove)
    wBlink(WMove)
})
function BBlink (num: number) {
    bcoord(num)
    bright = 95
    led.unplot(bx, by)
    basic.pause(500)
    led.plotBrightness(bx, by, bright)
}
function bcoord (num: number) {
    bx = BLACK[num * 2]
    by = BLACK[num * 2 + 1]
}
input.onButtonPressed(Button.B, function () {
    wForward()
    bx = -1
    BMove = randint(0, 2)
    bcoord(BMove)
    while (bx == -1) {
        BMove = randint(0, 2)
        bcoord(BMove)
    }
    bForward()
})
function wcoord (num: number) {
    wx = WHITE[num * 2]
    wy = WHITE[num * 2 + 1]
}
function bForward () {
    if (255 != led.pointBrightness(bx, by + 2)) {
        bright = 95
        led.unplot(bx, by)
        basic.pause(500)
        led.plotBrightness(bx, by + 2, bright)
        BLACK[BMove * 2 + 1] = by + 2
        BLACK[BMove * 2] = bx
        bcoord(BMove)
    } else {
        BBlink(BMove)
    }
}
function wBlink (num: number) {
    wcoord(num)
    bright = 255
    led.unplot(wx, wy)
    basic.pause(500)
    led.plotBrightness(wx, wy, bright)
}
let by = 0
let bx = 0
let bright = 0
let wy = 0
let wx = 0
let BLACK: number[] = []
let WHITE: number[] = []
let BMove = 0
let WMove = 0
basic.showIcon(IconNames.Chessboard)
basic.pause(100)
basic.showIcon(IconNames.TShirt)
basic.pause(100)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
for (let index = 0; index <= 4; index++) {
    led.plotBrightness(index, 1, 20)
}
for (let index2 = 0; index2 <= 4; index2++) {
    led.plotBrightness(index2, 3, 20)
}
for (let index3 = 0; index3 <= 4; index3++) {
    led.plotBrightness(1, index3, 20)
}
for (let index4 = 0; index4 <= 4; index4++) {
    led.plotBrightness(3, index4, 20)
}
led.plotBrightness(0, 4, 255)
led.plotBrightness(2, 4, 255)
led.plotBrightness(4, 4, 255)
led.plotBrightness(4, 0, 95)
led.plotBrightness(2, 0, 95)
led.plotBrightness(0, 0, 95)
WMove = 0
BMove = 0
WHITE = [0, 4, 2, 4, 4, 4]
BLACK = [0, 0, 2, 0, 0, 0]
wBlink(0)
