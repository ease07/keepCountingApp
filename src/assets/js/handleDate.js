export function handleDate(data){
	for(let i in data){
		var toDate = new Date(data[i].date);
		let year = toDate.getFullYear()+'年';
		let month = toDate.getMonth()+1+'月';
		let day = toDate.getDate()+'日';
		data[i].date = [year, month, day].join('');
	}
}