function LedCalibrar () {
    basic.showLeds(`
        # . # . .
        . # . . .
        # . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . #
        . . . # .
        . . # . #
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
        `)
}
function Calibrar () {
    LedCalibrar()
    basic.showNumber(tolerancia)
    basic.pause(1000)
    basic.showLeds(`
        . . # . .
        . # # . .
        # # # # #
        . # # . .
        . . # . .
        `)
    basic.pause(1000)
    CalibrarEsquerda = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
    basic.pause(2000)
    basic.showLeds(`
        . . # . .
        . . # # .
        # # # # #
        . . # # .
        . . # . .
        `)
    basic.pause(2000)
    CalibrarDireita = pins.analogReadPin(AnalogPin.P2)
    basic.showNumber(pins.analogReadPin(AnalogPin.P2))
    basic.pause(2000)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    OnOff()
})
input.onButtonPressed(Button.A, function () {
    if (Math.abs(tolerancia) < 50) {
        salto = 10
    } else {
        salto = 50
    }
    tolerancia = tolerancia + salto
    basic.showNumber(tolerancia)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    reiniciar()
})
input.onButtonPressed(Button.B, function () {
    if (Math.abs(tolerancia) < 50) {
        salto = 10
    } else {
        salto = 50
    }
    tolerancia = tolerancia - salto
    basic.showNumber(tolerancia)
})
function mover () {
    if (leituraP1 <= CalibrarDireita - tolerancia) {
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
        robotbit.MotorRun(robotbit.Motors.M2B, 45)
        basic.pause(50)
    } else if (leituraP2 <= CalibrarEsquerda - tolerancia) {
        robotbit.MotorRun(robotbit.Motors.M1A, 45)
        robotbit.MotorRun(robotbit.Motors.M2B, 0)
        basic.pause(50)
    } else {
        robotbit.MotorRun(robotbit.Motors.M1A, 50)
        robotbit.MotorRun(robotbit.Motors.M2B, 50)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
    }
}
function reiniciar () {
    ligado = 0
    tolerancia = 250
    robotbit.MotorRun(robotbit.Motors.M1A, 0)
    robotbit.MotorRun(robotbit.Motors.M2B, 0)
    Calibrar()
}
function OnOff () {
    if (ligado == 0) {
        ligado = 1
    } else {
        ligado = 0
    }
}
let ligado = 0
let leituraP2 = 0
let leituraP1 = 0
let salto = 0
let CalibrarDireita = 0
let CalibrarEsquerda = 0
let tolerancia = 0
reiniciar()
basic.forever(function () {
    leituraP1 = pins.analogReadPin(AnalogPin.P1)
    leituraP2 = pins.analogReadPin(AnalogPin.P2)
    if (ligado == 1) {
        mover()
    } else {
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
        robotbit.MotorRun(robotbit.Motors.M2B, 0)
    }
})
