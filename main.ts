function wForward () {
    wcoord(WMove)
    canWCap(WMove)
    if (canWCap(WMove) == 1) {
        basic.showString("need to capture!")
    } else {
        if (95 != led.pointBrightness(wx, wy - 2)) {
            // record w move
            // 
            wmoves.unshift(WMove)
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
}
input.onButtonPressed(Button.A, function () {
    WMove += 1
    if (WMove > 2) {
        WMove = 0
    }
    wcoord(WMove)
    wBlink(WMove)
})
function BBlink (num: number) {
    bcoord(num)
    bright = 95
    led.plotBrightness(bx, by, 0)
    basic.pause(500)
    led.plotBrightness(bx, by, bright)
}
function wCap (num: number) {
    if (led.pointBrightness(wx + 2, wy - 2) == 95) {
        return 1
    }
    if (led.pointBrightness(wx - 2, wy - 2) == 95) {
        return 1
    }
    return 0
}
function bcoord (num: number) {
    bx = BLACK[num * 2]
    by = BLACK[num * 2 + 1]
}
function canWCap (num: number) {
    wcoord(num)
    if (led.pointBrightness(wx + 2, wy - 2) == 95) {
        return 1
    }
    if (led.pointBrightness(wx - 2, wy - 2) == 95) {
        return 1
    }
    return 0
}
input.onButtonPressed(Button.B, function () {
    wForward()
    BMove = randint(0, 2)
    bcoord(BMove)
    bForward()
    bmoves.unshift(BMove)
})
function canBCap (num: number) {
    bcoord(num)
    if (led.pointBrightness(bx + 2, by + 2) == 255) {
        return 1
    }
    if (led.pointBrightness(bx - 2, by + 2) == 255) {
        return 1
    }
    return 0
}
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
    led.plotBrightness(wx, wy, 0)
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
let wmoves: number[] = []
let bmoves: number[] = []
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
bmoves = []
wmoves = []
led.plotBrightness(0, 4, 255)
led.plotBrightness(2, 4, 255)
led.plotBrightness(4, 4, 255)
led.plotBrightness(4, 0, 95)
led.plotBrightness(2, 0, 95)
led.plotBrightness(0, 0, 95)
WMove = 0
BMove = 0
WHITE = [0, 4, 2, 4, 4, 4]
BLACK = [0, 0, 2, 0, 4, 0]
wBlink(0)
