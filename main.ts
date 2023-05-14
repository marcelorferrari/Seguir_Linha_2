function Calibrar (cal: number) {
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
    tolerancia = tolerancia + cal
    basic.showNumber(tolerancia)
    basic.pause(1200)
    basic.showLeds(`
        . . # . .
        . # # . .
        # # # # #
        . # # . .
        . . # . .
        `)
    CalibrarEsquerda = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
    basic.pause(1200)
    basic.showLeds(`
        . . # . .
        . . # # .
        # # # # #
        . . # # .
        . . # . .
        `)
    CalibrarDireita = pins.analogReadPin(AnalogPin.P2)
    basic.showNumber(pins.analogReadPin(AnalogPin.P2))
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    OnOff()
})
input.onButtonPressed(Button.A, function () {
    Calibrar(10)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    reiniciar()
})
input.onButtonPressed(Button.B, function () {
    Calibrar(-10)
})
function mover () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    if (ligado == 1) {
        if (pins.analogReadPin(AnalogPin.P1) <= CalibrarDireita - tolerancia) {
            basic.showLeds(`
                . . # . .
                . . # # .
                # # # # #
                . . # # .
                . . # . .
                `)
            robotbit.MotorRun(robotbit.Motors.M1A, 0)
            robotbit.MotorRun(robotbit.Motors.M2B, 75)
            basic.pause(50)
        } else if (pins.analogReadPin(AnalogPin.P2) <= CalibrarEsquerda - tolerancia) {
            basic.showLeds(`
                . . # . .
                . # # . .
                # # # # #
                . # # . .
                . . # . .
                `)
            robotbit.MotorRun(robotbit.Motors.M1A, 75)
            robotbit.MotorRun(robotbit.Motors.M2B, 0)
            basic.pause(50)
        } else {
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                `)
            robotbit.MotorRun(robotbit.Motors.M1A, 75)
            robotbit.MotorRun(robotbit.Motors.M2B, 75)
        }
    } else {
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
        robotbit.MotorRun(robotbit.Motors.M2B, 0)
    }
}
function reiniciar () {
    ligado = 0
    tolerancia = 30
    robotbit.MotorRun(robotbit.Motors.M1A, 0)
    robotbit.MotorRun(robotbit.Motors.M2B, 0)
    Calibrar(0)
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
	
})
