<template>
	<div class="play">
		<div class="content" @touchstart="start" @touchend="end">
			<div class="item" v-for="(item,index) in numbers" :key='index'>
				<div :class="item===0?numberZeroClass:'number'"
				:style="itemStyles[Math.log2(item)]">{{item}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
    name:'play',
		data() {
			return {
				numbers: [],
				numberZeroClass: 'number numberZero', // 格子为零将数字隐藏
				itemStyles:'color:#000; background:', // 根据数字大小设置颜色
				startX: '', //开始触摸的x坐标
				startY: '', //开始触摸的y坐标
			}
		},
		created() {
			this.numbers = [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			this.itemStyles = [
				'color:#000; background:#FFF3EE',
				'color:#000; background:#FFDAC8',
				'color:#000; background:#FFBD9D',
				'color:#000; background:#FF9D6F',
				'color:#000; background:#FF5809',
				'color:#000; background:#FF8040',
				'color:#fff; background:#F75000',
				'color:#fff; background:#BB3D00',
				'color:#fff; background:#842B00',
				'color:#fff; background:#424200',
				'color:#fff; background:#000079',
				'color:#fff; background:#2F0000',
			]
			// this.fristNumber()
		},
		methods: {
			fristNumber(){
				this.numbers[Math.floor(Math.random()*16)] = 2
			},
			move(direction){
				let arr = []
				let numbers = this.numbers.slice(0) // 深拷贝
				let arrItem = []
				switch(direction){
					case 'up':{
						console.log('up');
						// 从上到下每一行生成一个数组
						numbers.forEach((item, index) => {
							for (let i = 0; i < this.numbers.length / 5; i++) {
								arrItem.push(numbers.shift(index))
							}
							arr.push(arrItem)
							arrItem = []
						})
					}break
					case 'down':{
						// 从下到上每一行生成一个数组
						numbers.forEach((item, index) => {
							for (let i = 0; i < this.numbers.length / 5; i++) {
								arrItem.push(numbers.shift(index))
							}
							arr.unshift(arrItem)
							arrItem = []
						})
					}break
					case 'left':{
						// 从左到右每一列生成一个数组
						let c0 = [],c1 = [],c2 = [],c3 = [],c4 = []
						numbers.forEach((item, index) => {
							if(index % 5 === 0){
								c0.push(item)
							}else if(index % 5 === 1){
								c1.push(item)
							}else if(index % 5 === 2){
								c2.push(item)
							}else if(index % 5 === 3){
								c3.push(item)
							}else{
                c4.push(item)
              }
						})
							arr.push(c0,c1,c2,c3,c4)
					}break
					case 'right':{
						// 从右到左每一列生成一个数组
						let c0 = [],c1 = [],c2 = [],c3 = [],c4 = []
						numbers.forEach((item, index) => {
							if(index % 5 === 0){
								c0.push(item)
							}else if(index % 5 === 1){
								c1.push(item)
							}else if(index % 5 === 2){
								c2.push(item)
							}else if(index % 5 === 3){
								c3.push(item)
							}else{
                c4.push(item)
              }
						})
							arr.push(c4,c3,c2,c1,c0)
					}break
					default :
						console.log('move parameter must one of up、down、left and right of sting type');
					}


					let arrItem1
					let arrItem2
					let added = [] //arrItem1相加过的索引
					for (let i = 0; i < 4; i++) { // 循环四次
						arr.forEach((item2, index2) => {
							if (index2 < arr.length - 1) {
								arrItem1 = item2
								arrItem2 = arr[index2 + 1]
								arrItem1.forEach((item, index) => {
									if (arrItem2[index] === 0 || item === 0) {
										arrItem1[index] += arrItem2[index]
										arrItem2[index] = 0
									} else if (item === arrItem2[index] && item * arrItem2[index] !== 0 &&
										added.indexOf(index) == -1) {
										arrItem1[index] += arrItem2[index]
										arrItem2[index] = 0
										added.push(index)
									}
								})
							}
						})
					}
					let startNumber = this.numbers // 记录初始numbers
					if(direction === 'up'){
						this.numbers = arr.flat()				
						
					}else if(direction === 'down'){
						let numbers2 = []
						arr.forEach((item, index)=>{
							numbers2.push(arr[4-index])
						})
						this.numbers = numbers2.flat()
						
					}else if(direction === 'left'){
						let numbers3 = []
						for (let i = 0; i < arr.length; i++) {
							arr.forEach((item, index)=>{
								numbers3.push(item[i])
							})
						}
						this.numbers = numbers3.flat()
						
					}else if(direction === 'right'){
						let numbers4 = []
						for (let i = 0; i < arr.length; i++) {
							for (let k = 0; k < arr.length; k++){
								numbers4.push(arr[4-k][i])
							}
						}
						this.numbers = numbers4.flat()
					}
					
					
					let endNumber = this.numbers // 记录结束numbers
					// 开始和结束的numbers不相等即存在数字的位置都发生变化，增加数字
					if (startNumber.toString() !== endNumber.toString()) {
						this.addNumber()
					}
				
			},
			//随机添加数字
			addNumber() {
				let arrZeros = [] // numbers中值为零的索引
				this.numbers.forEach((item, index) => {
					if (item === 0) arrZeros.push(index)
				})
				//arrZeros数组中随机取一个值
				let randomItem = arrZeros[Math.floor(Math.random() * arrZeros.length)]
				this.numbers[randomItem] = 2
			},
			getNumberColor(){
				
			},
			start(e) {
				this.startX = Math.floor(e.changedTouches[0].clientX)
				this.startY = Math.floor(e.changedTouches[0].clientY)
			},
			end(e) {
				// x,y为滑动的距离
				let x = Math.floor(e.changedTouches[0].clientX) - this.startX
				let y = Math.floor(e.changedTouches[0].clientY) - this.startY

				if (x > 50 && 0 < y < 50) {
					console.log('右滑')
					this.move('right')
				} else if (x < -50 && 0 < y < 50) {
					console.log('左滑')
					this.move('left')
				} else if (0 < x < 50 && y < -50) {
					console.log('上滑')
					this.move('up')
				} else if (0 < x < 50 && y > 50) {
					console.log('下滑');
					this.move('down')
				}
                let score=0;
                for(var i=0;i<this.numbers.length;i++){
                    score+=this.numbers[i]
                }
                this.$store.commit('setScore',score)
			}
		},
	}
</script>

<style scoped lang="less">

	
	.play {
		width: 100%;
		.content {
			display: flex;
			justify-content: space-around;
			box-sizing: border-box;
			flex-wrap: wrap;
			width: 310px;
			height: 310px;
			.item {
				width: 19%;
				height: 19%;
				background: #fff;
				.number {
					color: #fff;
					background: #f6ff43;
					border-radius: 10%;
					text-align: center;
					line-height: 73.6px;
					font-size: 25px;
					font-weight: 600;
				}
				.numberZero {
					background: #D1E9E9;
					font-size: 0px;
				}
			}

		}
	}
</style>
