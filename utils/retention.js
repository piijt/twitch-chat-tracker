const fs = require('fs');
const table = fs.readFileSync('./chat_tracker-test.json')
// retention for a viewer
const calculate_retention = (table) => {
    const retention = null;
    let view_time_minutes = [];
    for(const items of Object.entries(JSON.parse(table))){
        // console.log(items)

        for(const key of Object.keys(items[1])) {
            const viewer_info = items[1][key];
            const retention = new Date(viewer_info.table[viewer_info.table.length -1].time) - new Date(viewer_info.table[0].time)
            
            viewer_info.watchTime = retention;
            // for(const info of viewer_info.table) {
            //     console.log(info[info.length -1].time - info[0].time);
            // }
            
        }
    }
    console.log(JSON.stringify())
    fs.writeFileSync('./chat-tracker-test-mod.json', JSON.stringify(table))
};

calculate_retention(table)

// the avg percentage retention rate
const calculate_retention_rate = () => {}

// avg retention rate for the whole stream
const relative_retention_rate = () => {};