import qrcode  # pyright: ignore[reportMissingModuleSource]

# WEBSITE URL
URL = "https://mintflowers.pages.dev/"

# CREATE QR
qr = qrcode.QRCode(
    version=None,
    error_correction = qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=4
)

qr.add_data(URL)
qr.make(fit=True)

# GENERATE IMAGE
image = qr.make_image()
image.save("mintflowers_qr.png")

print("QR created successfully!")