class UserAccount {
    uid: string;
    name: string;
    email: string;
    imgProfile: string;
    billing_name: string;
    billing_direction: string;
    billing_cuit: number;
    providerPass: string;
    pendingDelete: boolean;


    constructor(json: any) {
        if (json) {
            this.name = json.name ? json.name : ""
            this.email = json.email ? json.email : ""
            this.imgProfile = json.imgProfile ? json.imgProfile : "avatar-m.png"
            this.billing_name = json.billing_name ? json.billing_name : ""
            this.billing_direction = json.billing_direction ? json.billing_direction : ""
            this.billing_cuit = json.billing_cuit ? json.billing_cuit : 0;
            this.uid = json.uid ? json.uid : ""
            this.providerPass = json.providerPass ? json.providerPass : ""
            this.pendingDelete = json.pendingDelete ? json.pendingDelete : false
        } else {
            this.name = ""
            this.email = ""
            this.imgProfile = "avatar-m.png"
            this.billing_name = ""
            this.billing_direction = ""
            this.billing_cuit = 0;
            this.uid = ""
            this.providerPass = ""
            this.pendingDelete = false
        }
    }
};

export { UserAccount }