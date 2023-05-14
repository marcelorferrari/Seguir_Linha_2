function Calibrar () {
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
    CalibrarDireita = pins.analogReadPin(AnalogPin.P2)
    basic.showNumber(pins.analogReadPin(AnalogPin.P2))
    basic.pause(2000)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    OnOff()
})
input.onButtonPressed(Button.A, function () {
    tolerancia = tolerancia + 50
    basic.showNumber(tolerancia)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    reiniciar()
})
input.onButtonPressed(Button.B, function () {
    tolerancia = tolerancia - 50
    basic.showNumber(tolerancia)
})
function mover () {
    if (ligado == 1) {
        if (pins.analogReadPin(AnalogPin.P1) <= CalibrarDireita - tolerancia) {
            robotbit.MotorRun(robotbit.Motors.M1A, 0)
            robotbit.MotorRun(robotbit.Motors.M2B, 50)
            basic.pause(50)
        } else if (pins.analogReadPin(AnalogPin.P2) <= CalibrarEsquerda - tolerancia) {
            robotbit.MotorRun(robotbit.Motors.M1A, 50)
            robotbit.MotorRun(robotbit.Motors.M2B, 0)
            basic.pause(50)
        } else {
            robotbit.MotorRun(robotbit.Motors.M1A, 75)
            robotbit.MotorRun(robotbit.Motors.M2B, 75)
            basic.showLeds(`
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                . . . . .
                `)
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                `)
            basic.showLeds(`
                . . . . .
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                `)
        }
    } else {
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
        robotbit.MotorRun(robotbit.Motors.M2B, 0)
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
let CalibrarDireita = 0
let CalibrarEsquerda = 0
let tolerancia = 0
reiniciar()
basic.forever(function () {
    mover()
})
