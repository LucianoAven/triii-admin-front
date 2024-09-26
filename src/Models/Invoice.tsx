class Invoice {
    
    createDate: string;
    
    constructor(json: any) {
        if (json) {

            this.createDate = json.createDate ? json.createDate : ""
        } else {
            this.createDate = ""
        }
    }
}

export { Invoice }