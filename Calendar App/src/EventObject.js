export class EventObject {
    constructor(title, description, location, date, startTime, endTime, important) {
        this.id = this.generateID();
        this.title = title;
        this.description = description;
        this.location = location;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.important = important;
    }

    generateID() {
        return Date.now() + Math.random().toString(16).slice(2);
    }
}