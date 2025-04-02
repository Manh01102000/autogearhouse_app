function removeAccent(mystring) {
    // Vietnamese characters and their non-accented equivalents
    const marTViet = [
        "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ",
        "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ",
        "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ",
        "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ",
        "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
        "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
        "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
        "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ", "'"
    ];

    const marKoDau = [
        "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
        "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
        "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
        "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "d",
        "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
        "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
        "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
        "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", ""
    ];

    // Replace accented characters with their non-accented counterparts
    return marTViet.reduce((str, char, index) => {
        return str.replace(new RegExp(char, 'g'), marKoDau[index]);
    }, mystring);
}
// 
function replaceTitle(title) {
    // Decode HTML entities (dummy function for representation)
    title = title.replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&');

    // Remove accents
    title = removeAccent(title);

    // Remove slashes
    title = title.replace(/\//g, '');

    // Check for Han characters
    const hasHan = /[\u4E00-\u9FFF]/.test(title);

    if (hasHan) {
        title = title.replace(/ /g, '-');
    } else {
        const arrStr = [
            "&lt;", "&gt;", "/", " / ", "\"", "&apos;", "&quot;", "&amp;",
            "lt;", "gt;", "apos;", "quot;", "amp;", "&lt", "&gt", "&apos", "&quot", "&amp", "&#34;", "&#39;", "&#38;", "&#60;", "&#62;"
        ];

        arrStr.forEach(str => {
            title = title.replace(new RegExp(str, 'g'), ' ');
        });

        // title = title.replace(/[\\p{P}|\p{S}]/gu, ' '); // Keep this if you need punctuation removal.
        title = title.replace(/[^0-9a-zA-Z\s]+/g, ' '); // Non-alphanumeric to spaces

        // Remove multiple spaces
        title = title.replace(/\s+/g, ' ').trim();

        title = title.replace(/ /g, '-');
        title = encodeURIComponent(title);

        // Remove specific characters after URL encoding
        const arrayApter = ["%0D%0A", "%", "&", "---"];
        arrayApter.forEach(str => {
            title = title.replace(new RegExp(str, 'g'), '-');
        });

        title = title.toLowerCase();
    }

    return title;
}

function lay_tgian(tgian) {
    let tg = Math.floor(Date.now() / 1000) - tgian; // Get the difference in seconds
    let thoi_gian;

    if (tg > 0) {
        if (tg < 60) {
            thoi_gian = tg + ' giây';
        } else if (tg >= 60 && tg < 3600) {
            thoi_gian = Math.floor(tg / 60) + ' phút';
        } else if (tg >= 3600 && tg < 86400) {
            thoi_gian = Math.floor(tg / 3600) + ' giờ';
        } else if (tg >= 86400 && tg < 2592000) {
            thoi_gian = Math.floor(tg / 86400) + ' ngày';
        } else if (tg >= 2592000 && tg < 77760000) {
            thoi_gian = Math.floor(tg / 2592000) + ' tháng';
        } else if (tg >= 77760000 && tg < 933120000) {
            thoi_gian = Math.floor(tg / 77760000) + ' năm';
        }
    } else {
        thoi_gian = '1 giây';
    }

    return thoi_gian;
}

function timeAgo(timestamp) {
    const now = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại dưới dạng timestamp (giây)
    const secondsAgo = now - timestamp;
    if (secondsAgo < 60) {
        return `${secondsAgo} giây trước`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} phút trước`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} giờ trước`;
    } else if (secondsAgo < 604800) {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo} ngày trước`;
    } else if (secondsAgo < 2592000) {
        const weeksAgo = Math.floor(secondsAgo / 604800);
        return `${weeksAgo} tuần trước`;
    } else if (secondsAgo < 31536000) {
        const monthsAgo = Math.floor(secondsAgo / 2592000);
        return `${monthsAgo} tháng trước`;
    } else {
        const yearsAgo = Math.floor(secondsAgo / 31536000);
        return `${yearsAgo} năm trước`;
    }
}

function str_replace(search, replace, subject) {
    // Kiểm tra nếu search và replace có cùng độ dài
    if (search.length !== replace.length) {
        throw new Error('search và replace phải có cùng độ dài');
    }

    // Thay thế các giá trị trong subject
    for (let i = 0; i < search.length; i++) {
        subject = subject.split(search[i]).join(replace[i]);
    }

    return subject;
}

function nl2br(str) {
    if (typeof str === 'string') {
        return str.replace(/\n/g, '<br>');
    }
    return str;
}

// hàm date, time
function Ejsdate(format, date = new Date()) {
    // Xử lý đầu vào date
    if (typeof date === 'string' && /^\d+$/.test(date)) {
        // Nếu là chuỗi số (như "970363130")
        const timestamp = parseInt(date);
        date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
    } else if (typeof date === 'number') {
        // Nếu là số (Unix timestamp)
        date = date < 10000000000 ? new Date(date * 1000) : new Date(date);
    } else if (!(date instanceof Date)) {
        // Nếu không phải Date, chuyển đổi thành Date
        date = new Date(date);
    }

    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const map = {
        'Y': date.getFullYear(),
        'm': String(date.getMonth() + 1).padStart(2, '0'),
        'd': String(date.getDate()).padStart(2, '0'),
        'H': String(date.getHours()).padStart(2, '0'),
        'i': String(date.getMinutes()).padStart(2, '0'),
        's': String(date.getSeconds()).padStart(2, '0')
    };

    return format.replace(/[YmdHis]/g, matched => map[matched]);
}

function Ejstime() {
    return Math.floor(Date.now() / 1000);  // Lấy timestamp theo giây
}

function convertToTimestamp(dateString) {
    const date = new Date(dateString); // Chuyển chuỗi ngày thành đối tượng Date
    return date.getTime() / 1000; // Trả về timestamp
}

const dataRole = [
    'Chọn vai trò',
    'khách hàng',
    'Nhân viên',
    'Tiếp thị liên kết'
];

const dataAdminPosition = [
    'Chọn vị trí',
    'Quản lý',
    'Trưởng phòng',
    'Nhân viên',
];

const dataAdminDepartment = [
    'Chọn phòng ban',
    'Phòng admin',
    'Phòng kinh doanh',
    'Phòng nhân sự',
    'Phòng tác giả',
];

const dataRangeMoney = [
    'Chọn mức lương',
    '0 - 1 triệu',
    '1 - 3 triệu',
    '3 - 5 triệu',
    '5 - 7 triệu',
    '7 - 10 triệu',
    '10 - 15 triệu',
    '10 - 20 triệu',
    'trên 20 triệu',
    'trên 30 triệu',
    'trên 50 triệu',
    'trên 100 triệu',
];

// Nhiên liệu
const dataFuelType = [
    'Chọn loại nhiên liệu',
    'Xăng',
    'Dầu',
    'Động cơ Hybrid',
    'Điện'
];

// Hộp số
const dataTransmission = [
    'Chọn hộp số',
    'Tự động',
    'Số sàn',
    'Bán tự động'
]

// Dung tích động cơ
const dataEngineCapacity = [
    'Chọn dung tích động cơ',
    'Dưới 1.0L',
    '1.0L - 1.5L',
    '1.6L - 2.0L',
    '2.0L - 2.5L',
    '2.6L - 3.5L',
    '3.5L - 4.0L',
    '4.0L - 6.0L',
    'Trên 6.0L',
];

// Momen
const dataTorque = [
    'Chọn Mô-men xoắn (Nm)',
    '90 - 120 Nm',
    '120 - 180 Nm',
    '180 - 250 Nm',
    '250 - 350 Nm',
    '350 - 500 Nm',
    '450 - 600 Nm',
    '600 - 900 Nm',
    '900 - 1500+ Nm',
];

// Dẫn động
const dataDriveType = [
    'Chọn dẫn động',
    'Dẫn động cầu trước (FWD)',
    'Dẫn động cầu sau (RWD)',
    'Dẫn động 4 bánh (AWD)',
    'Dẫn động 4 bánh (4WD)',
];

// Loại thân xe
const dataBodyType = [
    'Chọn loại thân xe',
    'Hatchback',
    'Sedan',
    'Crossover (CUV)',
    'SUV (Sport Utility Vehicle)',
    'MPV (Multi-Purpose Vehicle)',
    'Coupe',
    'Convertible (Mui trần)',
    'Pickup (Bán tải)',
];

// Số chỗ ngồi
const dataSeats = [
    'Chọn số chỗ ngồi',
    '2 chỗ',
    '3 chỗ',
    '4 chỗ',
    '5 chỗ',
    '6 chỗ',
    '7 chỗ',
    '8 chỗ',
    '9 chỗ',
    '10 chỗ',
];

// Số cửa sổ
const dataDoors = [
    'Chọn số cửa sổ',
    '2 cửa sổ',
    '3 cửa sổ',
    '4 cửa sổ',
    '5 cửa sổ',
    '6 cửa sổ',
];

// Số túi khí
const dataAirbags = [
    'Chọn số túi khí',
    '2 túi khí',
    '3 túi khí',
    '4 túi khí',
    '5 túi khí',
    '6 túi khí',
    '7 túi khí',
    '8 túi khí',
    '9 túi khí',
    '10 túi khí',
];

// tính năng an toàn
const dataSafetyFeatures = [
    'Chọn tính năng an toàn',
    'Túi khí (Airbags)',
    'Phanh ABS',
    'Hỗ trợ phanh khẩn cấp',
    'Cân bằng điện tử',
    'Kiểm soát lực kéo',
    'Cảnh báo điểm mù',
    'Cảnh báo lệch làn',
    'Hỗ trợ giữ làn đường',
    'Kiểm soát hành trình',
    'Camera 360°',
    'Cảm biến va chạm',
    'Hỗ trợ xuống dốc',
    'Phanh tay điện tử & Auto Hold',
];

// hệ thống giải trí
const dataInfotainment = [
    'Chọn hệ thống giải trí',
    'Màn hình trung tâm cảm ứng',
    'Apple CarPlay/Android Auto',
    'Màn hình HUD',
    'Âm thanh cao cấp',
    'Kết nối Bluetooth/USB/AUX',
    'Sạc không dây',
    'Điều khiển giọng nói',
    'Cửa sổ trời toàn cảnh',
    'Màn hình ghế sau',
    'Khác',
];

// màu sắc
const dataColor = [
    'Chọn màu sắc',
    'Trắng',
    'Đen',
    'Xám/Bạc',
    'Đỏ',
    'Xanh dương',
    'Vàng',
    'Xanh lá',
    'Cam',
    'Tím',
    'Nâu',
    'Khác'
];

export {
    replaceTitle,
    lay_tgian,
    timeAgo,
    str_replace,
    nl2br,
    Ejsdate,
    Ejstime,
    convertToTimestamp,
    dataRole,
    dataAdminPosition,
    dataAdminDepartment,
    dataRangeMoney,
    dataFuelType,
    dataTransmission,
    dataEngineCapacity,
    dataTorque,
    dataDriveType,
    dataBodyType,
    dataSeats,
    dataDoors,
    dataAirbags,
    dataSafetyFeatures,
    dataInfotainment,
    dataColor
}