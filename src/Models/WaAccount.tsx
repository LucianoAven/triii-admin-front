class WaAccount {
    id: number;
    name: string;
    status: status;
    created_at: Date;
    deleted_at?: Date;
    trial_date_end: string;
    wa_number: number;
    wa_status: wa_status;
    wa_qr: string;
    wa_laststatus_datetime: string;
    wa_laststatus_value: string;
    wa_autodelete: number;
    webhook: string;
    token: string;

    constructor(json: any) {
        if (json) {
            this.id = json.id ? json.id : 0;
            this.name = json.name ? json.name : '';
            this.status = enumFromStatusString<status>(status, json.status)
            this.created_at = json.name ? json.created_at : undefined;
            this.deleted_at = json.name ? json.deleted_at : undefined;
            this.trial_date_end = "";
            this.wa_number = 0;
            this.wa_status = enumFromWAStatusString<wa_status>(wa_status, json.status)
            this.wa_qr = "";
            this.wa_laststatus_datetime = "";
            this.wa_laststatus_value = "";
            this.webhook = "";
            this.token = "";
            this.wa_autodelete = json.wa_autodelete ? json.wa_autodelete : 0;
        }
        else {
            this.id = 0;
            this.name = '';
            this.status = status.UNKNOWN
            this.created_at = new Date();
            this.deleted_at = undefined;
            this.trial_date_end = "";
            this.wa_number = 0;
            this.wa_status = wa_status.UNPAIRED_IDLE;
            this.wa_qr = "";
            this.wa_laststatus_datetime = "";
            this.wa_laststatus_value = "";
            this.webhook = "";
            this.token = "";
            this.wa_autodelete = 0;
        }
    };


}

function enumFromStatusString<T>(enm: { [s: string]: T }, value: string): T | status {
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? value as unknown as T
        : status.UNKNOWN;
}
function enumFromWAStatusString<T>(enm: { [s: string]: T }, value: string): T | wa_status {
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? value as unknown as T
        : wa_status.UNPAIRED_IDLE;
}

export enum status {
    ACTIVE = "ACTIVE",
    PROVISIONING = "PROVISIONING",
    STARTING = "STARTING",
    DELETED = "DELETED",
    BLOCK = "BLOCK",
    UNKNOWN = "UNKNOWN"
}
export enum wa_status {
    CONFLICT = "CONFLICT",
    CONNECTED = "CONNECTED",
    DEPRECATED_VERSION = "DEPRECATED_VERSION",
    OPENING = "OPENING",
    PAIRING = "PAIRING",
    PROXYBLOCK = "PROXYBLOCK",
    SMB_TOS_BLOCK = "SMB_TOS_BLOCK",
    TIMEOUT = "TIMEOUT",
    TOS_BLOCK = "TOS_BLOCK",
    UNLAUNCHED = "UNLAUNCHED",
    UNPAIRED = "UNPAIRED",
    UNPAIRED_IDLE = "UNPAIRED_IDLE"
}

export { WaAccount }