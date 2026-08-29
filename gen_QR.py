# Pyright/Pylance có thể báo thiếu module khi chưa cài dependency trong môi trường hiện tại.
# Chúng ta vẫn giữ try/except để bắt lỗi runtime và hiển thị hướng dẫn cài đặt rõ ràng.
# pyright: reportMissingModuleSource=false
try:
    import importlib
    import qrcode
except ImportError as exc:
    raise SystemExit(
        "Thiếu dependency 'qrcode'. Hãy cài đặt bằng: pip install qrcode"
    ) from exc

# Một số phiên bản qrcode không có các module styledpil / moduledrawers.
# Nếu thiếu, chúng ta sẽ fallback sang QR mặc định mà vẫn tạo thành công.
StyledPilImage = None
RoundedModuleDrawer = None

for module_name in (
    "qrcode.image.styledpil",
    "qrcode.image.styles.moduledrawers.pil",
):
    try:
        importlib.import_module(module_name)
    except ImportError:
        continue

try:
    StyledPilImage = importlib.import_module("qrcode.image.styledpil").StyledPilImage
    RoundedModuleDrawer = importlib.import_module(
        "qrcode.image.styles.moduledrawers.pil"
    ).RoundedModuleDrawer
except ImportError:
    StyledPilImage = None
    RoundedModuleDrawer = None

URL = "https://mintflowers.netlify.app/"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=4,
)

qr.add_data(URL)
qr.make(fit=True)

# Tạo QR bo tròn màu xanh lá botanical trên nền mint nhạt
if StyledPilImage is not None and RoundedModuleDrawer is not None:
    image = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        fill_color="#2C5E43",
        back_color="#EAF5F7",
    )
else:
    image = qr.make_image(fill_color="#2C5E43", back_color="#EAF5F7")

image.save("mintflowers_qr_art.png")
print("Tạo QR nghệ thuật thành công!")