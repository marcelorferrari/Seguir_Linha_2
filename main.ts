input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (ligado == 0) {
        ligado = 1
    } else {
        ligado = 0
    }
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P2))
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
        if (pins.analogReadPin(AnalogPin.P1) >= 100 && pins.analogReadPin(AnalogPin.P2) <= 900) {
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
        } else if (pins.analogReadPin(AnalogPin.P2) >= 100 && pins.analogReadPin(AnalogPin.P1) <= 900) {
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
let ligado = 0
let LCal = pins.analogReadPin(AnalogPin.P1)
let RCal = pins.analogReadPin(AnalogPin.P2)
ligado = 0
robotbit.MotorRun(robotbit.Motors.M1A, 0)
robotbit.MotorRun(robotbit.Motors.M2B, 0)
basic.forever(function () {
	
})
