type Direction = 'North' | 'East' | 'South' | 'West'

class MAQEBot {
	x: number
	y: number
	direction: Direction

	constructor() {
		this.x = 0
		this.y = 0
		this.direction = 'North'
	}

	turnRight() {
		switch (this.direction) {
			case 'North':
				this.direction = 'East'
				break
			case 'East':
				this.direction = 'South'
				break
			case 'South':
				this.direction = 'West'
				break
			case 'West':
				this.direction = 'North'
				break
		}
	}

	turnLeft() {
		switch (this.direction) {
			case 'North':
				this.direction = 'West'
				break
			case 'West':
				this.direction = 'South'
				break
			case 'South':
				this.direction = 'East'
				break
			case 'East':
				this.direction = 'North'
				break
		}
	}

	walk(distance: number) {
		switch (this.direction) {
			case 'North':
				this.y += distance
				break
			case 'East':
				this.x += distance
				break
			case 'South':
				this.y -= distance
				break
			case 'West':
				this.x -= distance
				break
		}
	}

	executeCommands(commands: string) {
		const regex = /([RLW])(\d*)/g
		let match: string[]
		while ((match = regex.exec(commands)) !== null) {
			const action = match[1]
			const value = match[2] ? +match[2] : 0

			if (action === 'R') {
				this.turnRight()
			} else if (action === 'L') {
				this.turnLeft()
			} else if (action === 'W' && value > 0) {
				this.walk(value)
			}
		}
	}

	getPositionAndDirection() {
		return { x: this.x, y: this.y, direction: this.direction }
	}
}

const main = () => {
	const args = process.argv.slice(2)
	if (args.length !== 1) {
		console.error('Usage: npm run dev <walking_code>')
		process.exit(1)
	}

	const walkingCode = args[0]
	const maqeBot = new MAQEBot()
	maqeBot.executeCommands(walkingCode)
	const positionAndDirection = maqeBot.getPositionAndDirection()
	console.log(positionAndDirection)
}

main()
