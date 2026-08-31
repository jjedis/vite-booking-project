import nodemailer from "nodemailer";

const SENDER_EMAIL = "jonjaderholm@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function buildConfirmationHtml({
  firstName,
  serviceName,
  durationMinutes,
  priceCents,
  startTime,
}) {
  const date = new Date(startTime);
  const dateLabel = date.toLocaleDateString("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeLabel = date.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const priceLabel =
    typeof priceCents === "number"
      ? `${(priceCents / 100).toFixed(2)} €`
      : null;

  return `
<!DOCTYPE html>
<html lang="fi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Varausvahvistus</title>
  </head>
  <body style="margin:0; padding:0; background-color:#16231f; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#16231f; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#fcf6e8; border-radius:20px; overflow:hidden;">

            <!-- header -->
            <tr>
              <td style="background-color:#1c2e28; padding:28px 36px;">
                <p style="margin:0 0 6px; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#c89456; font-weight:700;">
                  Varausvahvistus
                </p>
                <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-style:italic; font-size:22px; color:#ede7da;">
                  Laura Sihvonen <span style="color:#9cb0a8; font-style:normal; font-size:14px;">&mdash; Hyvinvointipalvelut</span>
                </p>
              </td>
            </tr>

            <!-- body -->
            <tr>
              <td style="padding:36px;">
                <p style="margin:0 0 4px; font-size:15px; color:#5a6a60;">Hei ${firstName},</p>
                <h1 style="margin:0 0 20px; font-family:Georgia, 'Times New Roman', serif; font-style:italic; font-weight:600; font-size:24px; color:#2c332e;">
                  Varauksesi on vahvistettu
                </h1>
                <p style="margin:0 0 28px; font-size:14px; line-height:1.6; color:#5a6a60;">
                  Kiitos varauksestasi! Tässä yhteenveto ajastasi &mdash; vahvistus on jo tallennettu kalenteriin, eikä sinun tarvitse tehdä muuta.
                </p>

                <!-- details card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffdf9; border:1px solid #e6ded0; border-radius:14px;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:6px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#9cb0a8; width:110px;">Palvelu</td>
                          <td style="padding:6px 0; font-size:15px; color:#2c332e; font-weight:600;">${serviceName}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#9cb0a8;">Ajankohta</td>
                          <td style="padding:6px 0; font-size:15px; color:#2c332e;">${dateLabel} klo ${timeLabel}</td>
                        </tr>
                        ${
                          durationMinutes
                            ? `<tr>
                          <td style="padding:6px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#9cb0a8;">Kesto</td>
                          <td style="padding:6px 0; font-size:15px; color:#2c332e;">${durationMinutes} min</td>
                        </tr>`
                            : ""
                        }
                        ${
                          priceLabel
                            ? `<tr>
                          <td style="padding:6px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#9cb0a8;">Hinta</td>
                          <td style="padding:6px 0; font-size:15px; color:#c89456; font-weight:700;">${priceLabel}</td>
                        </tr>`
                            : ""
                        }
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:28px 0 0; font-size:13px; line-height:1.6; color:#5a6a60;">
                  Jos sinun täytyy siirtää tai peruuttaa aikasi, ota yhteyttä alla olevista tiedoista mahdollisimman pian.
                </p>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="background-color:#1c2e28; padding:28px 36px;">
                <p style="margin:0 0 10px; font-family:Georgia, 'Times New Roman', serif; font-style:italic; font-size:16px; color:#ede7da;">
                  Laura Sihvonen Hyvinvointipalvelut
                </p>
                <p style="margin:0 0 4px; font-size:13px; color:#9cb0a8;">Puh. 0400973316</p>
                <p style="margin:0 0 4px; font-size:13px; color:#9cb0a8;">laura.sihvonen@outlook.com</p>
                <p style="margin:0; font-size:13px; color:#9cb0a8;">Ma&ndash;La, 9:00&ndash;20:00</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export async function sendBookingConfirmation({
  to,
  firstName,
  serviceName,
  durationMinutes,
  priceCents,
  startTime,
}) {
  const mailOptions = {
    from: `"Laura Sihvonen Hyvinvointipalvelut" <${SENDER_EMAIL}>`,
    to,
    subject: `Varausvahvistus – ${serviceName}`,
    html: buildConfirmationHtml({
      firstName,
      serviceName,
      durationMinutes,
      priceCents,
      startTime,
    }),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
}
