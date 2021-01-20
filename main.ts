function wForward () {
    wcoord(WMove)
    canWCap(WMove)
    if (canWCap(WMove) == 1) {
        wCap(WMove)
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
function canBmove (num: number) {
    bcoord(1)
    if (1 == bCap(num) || 0 == led.pointBrightness(bx, wy + 2)) {
        return 1
    } else {
        return 0
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
        led.unplot(wx, wy)
        led.plotBrightness(wx + 2, wy - 2, 255)
        WHITE[2 * num] = wx + 2
        WHITE[2 * num + 1] = wy - 2
        wcoord(num)
        for (let index = 0; index <= 2; index++) {
            bcoord(index)
            if (bx == wx && by == wy) {
                BLACK[2 * index] = -1
                BLACK[2 * index + 1] = -1
            }
        }
        return 1
    }
    if (led.pointBrightness(wx - 2, wy - 2) == 95) {
        led.unplot(wx, wy)
        led.plotBrightness(wx - 2, wy - 2, 255)
        WHITE[2 * num + 0] = wx - 2
        WHITE[2 * num + 1] = wy - 2
        wcoord(num)
        for (let index = 0; index <= 2; index++) {
            bcoord(index)
            if (bx == wx && by == wy) {
                BLACK[2 * index] = -1
                BLACK[2 * index + 1] = -1
            }
        }
        return 1
    }
    return 0
}
function canWmove (num: number) {
    wcoord(1)
    if (canWCap(num) == 1 || 0 == led.pointBrightness(wx, wy - 2)) {
        return 1
    } else {
        return 0
    }
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
function didWin () {
    for (let index = 0; index <= 2; index++) {
        wcoord(index)
        // Did white win?
        // 
        if (wy == 0) {
            basic.pause(200)
            basic.showString("White won!")
            game.setLife(0)
        }
    }
    for (let index = 0; index <= 2; index++) {
        bcoord(index)
        // Did white win?
        // 
        if (by == 4) {
            basic.pause(200)
            basic.showString("Black won!")
            game.setLife(0)
        }
    }
}
input.onButtonPressed(Button.B, function () {
    wForward()
    didWin()
    if (canBCap(0) || (canBCap(1) || canBCap(2))) {
        for (let index = 0; index <= 2; index++) {
            if (1 == canBCap(index)) {
                bCap(index)
                didWin()
            }
        }
    } else {
        BMove = randint(0, 2)
        bcoord(BMove)
        bForward(BMove)
        bmoves.unshift(BMove)
    }
    didWin()
    if (1 == isStalled()) {
        basic.showString("STALEMATE!")
        basic.pause(1000)
        game.setLife(0)
    }
})
function bCap (num: number) {
    bcoord(num)
    if (led.pointBrightness(bx + 2, by + 2) == 255) {
        led.unplot(bx, by)
        led.plotBrightness(bx + 2, by + 2, 95)
        BLACK[2 * num] = bx + 2
        BLACK[2 * num + 1] = by + 2
        bcoord(num)
        for (let index = 0; index <= 2; index++) {
            wcoord(index)
            if (bx == wx && by == wy) {
                WHITE[2 * index] = -1
                WHITE[2 * index + 1] = -1
            }
        }
        return 1
    }
    if (led.pointBrightness(bx - 2, by + 2) == 255) {
        led.unplot(bx, by)
        led.plotBrightness(bx - 2, by + 2, 95)
        BLACK[2 * num + 0] = bx - 2
        BLACK[2 * num + 1] = by + 2
        bcoord(num)
        for (let index = 0; index <= 2; index++) {
            wcoord(index)
            if (bx == wx && by == wy) {
                WHITE[2 * index] = -1
                WHITE[2 * index + 1] = -1
            }
        }
        return 1
    }
    return 0
}
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
function isStalled () {
    if (canBmove(0) || (canBmove(1) || canBmove(2)) || (canWmove(0) || (canWmove(1) || canWmove(2)))) {
        return 0
    } else {
        return 1
    }
}
function wcoord (num: number) {
    wx = WHITE[num * 2]
    wy = WHITE[num * 2 + 1]
}
function bForward (num: number) {
    if (1 == canBCap(num)) {
        bCap(num)
    } else {
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
for (let index = 0; index <= 4; index++) {
    for (let index2 = 0; index2 <= 4; index2++) {
        led.plotBrightness(index, index2, 0)
    }
}
bmoves = []
wmoves = []
game.setLife(1)
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
