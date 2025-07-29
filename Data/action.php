<?php
// Header CORS dan Content-Type
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Koneksi ke database
include "db_config.php";

// Ambil JSON dari frontend
$postjson = json_decode(file_get_contents('php://input'), true);

// Validasi aksi
$aksi = isset($postjson['aksi']) ? strip_tags($postjson['aksi']) : null;
$data = [];

if (!$aksi) {
    echo json_encode(['success' => false, 'msg' => 'Parameter aksi tidak ditemukan.']);
    exit;
}

// Handle setiap aksi
switch ($aksi) {

    case "login":
        $username = trim(filter_var($postjson['username'] ?? '', FILTER_SANITIZE_STRING));
        $password = trim(filter_var($postjson['password'] ?? '', FILTER_SANITIZE_STRING));

        if (!$username || !$password) {
            echo json_encode(['success' => false, 'msg' => 'Username dan password wajib diisi.']);
            break;
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = :username AND password = :password LIMIT 1");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                unset($user['password']); // Hilangkan password dari response
                echo json_encode(['success' => true, 'msg' => 'Login berhasil.', 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'msg' => 'Username atau password salah.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => 'Terjadi kesalahan pada server saat login.']);
        }
        break;

    case "add_register":
        $NamaPembooking = trim(filter_var($postjson['NamaPembooking'] ?? '', FILTER_SANITIZE_STRING));
        $nohp = trim(filter_var($postjson['nohp'] ?? '', FILTER_SANITIZE_STRING));
        $TanggalBooking = trim(filter_var($postjson['TanggalBooking'] ?? '', FILTER_SANITIZE_STRING));
        $TanggalPengembalian = trim(filter_var($postjson['TanggalPengembalian'] ?? '', FILTER_SANITIZE_STRING));
        $TypeUnit = trim(filter_var($postjson['TypeUnit'] ?? '', FILTER_SANITIZE_STRING));
        $HargaPerhari = trim(filter_var($postjson['HargaPerhari'] ?? '', FILTER_SANITIZE_STRING));
        $Layanan = trim(filter_var($postjson['Layanan'] ?? '', FILTER_SANITIZE_STRING));
        $Keterangan = trim(filter_var($postjson['Keterangan'] ?? '', FILTER_SANITIZE_STRING));

        try {
            $sql = "INSERT INTO rental_data (NamaPembooking, nohp, TanggalBooking, TanggalPengembalian, TypeUnit, HargaPerhari, Layanan, Keterangan) 
                    VALUES (:NamaPembooking, :nohp, :TanggalBooking, :TanggalPengembalian, :TypeUnit, :HargaPerhari, :Layanan, :Keterangan)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':NamaPembooking', $NamaPembooking);
            $stmt->bindParam(':nohp', $nohp);
            $stmt->bindParam(':TanggalBooking', $TanggalBooking);
            $stmt->bindParam(':TanggalPengembalian', $TanggalPengembalian);
            $stmt->bindParam(':TypeUnit', $TypeUnit);
            $stmt->bindParam(':HargaPerhari', $HargaPerhari);
            $stmt->bindParam(':Layanan', $Layanan);
            $stmt->bindParam(':Keterangan', $Keterangan);
            $stmt->execute();

            echo json_encode(['success' => true, 'msg' => 'Data berhasil ditambahkan.']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => 'Gagal menambahkan data: ' . $e->getMessage()]);
        }
        break;

    case "getdata":
        $limit = filter_var($postjson['limit'] ?? 10, FILTER_SANITIZE_NUMBER_INT);
        $start = filter_var($postjson['start'] ?? 0, FILTER_SANITIZE_NUMBER_INT);

        try {
            $sql = "SELECT * FROM rental_data ORDER BY id DESC LIMIT :start, :limit";
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(':start', (int)$start, PDO::PARAM_INT);
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = [
                    'NamaPembooking' => $row['NamaPembooking'],
                    'nohp' => $row['nohp'],
                    'TanggalBooking' => $row['TanggalBooking'],
                    'TanggalPengembalian' => $row['TanggalPengembalian'],
                    'TypeUnit' => $row['TypeUnit'],
                    'HargaPerhari' => $row['HargaPerhari'],
                    'Layanan' => $row['Layanan'],
                    'Keterangan' => $row['Keterangan']
                ];
            }

            echo json_encode(['success' => true, 'result' => $data]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => 'Gagal mengambil data: ' . $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'msg' => 'Aksi tidak dikenali: ' . $aksi]);
        break;
}
