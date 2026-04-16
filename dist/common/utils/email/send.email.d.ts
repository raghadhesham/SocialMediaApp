export declare const sendEmail: ({ from, to, subject, html, attachments, }: {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments?: [];
}) => Promise<boolean>;
export declare const generateOTP: () => Promise<number>;
//# sourceMappingURL=send.email.d.ts.map