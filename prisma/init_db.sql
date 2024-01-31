-- npx prisma migrate dev --name initを実行してからSupabaseのSQLクエリに貼り付けて実行する

INSERT INTO "User" ("userId", "username", "firstName", "lastName", "age", "email", "authority", "createdAt", "updatedAt", "isDeleted") VALUES 
('user1', 'ohara taro', '太郎', '大原', 20, 'taro.ohara@stu.o-hara.ac.jp', 0, current_timestamp, current_timestamp, false),
('user2', 'w.yuya', '雄也', '渡辺', 50, 'tky2202008@stu.o-hara.ac.jp', 0, current_timestamp, current_timestamp, false),
('useradmin', 'admin', '管理者', 'ユーザー', 30, 'admin@stu.o-hara.ac.jp', 1, current_timestamp, current_timestamp, false);

INSERT INTO "Allergy" ("allergyId", "allergyName") VALUES 
(1, 'エビ'),
(2, 'カニ'),
(3, '小麦'),
(4, 'そば'),
(5, '卵'),
(6, '乳'),
(7, 'ピーナッツ'),
(8, 'アーモンド'),
(9, 'あわび'),
(10, 'いか'),
(11, 'いくら'),
(12, 'オレンジ'),
(13, 'カシューナッツ'),
(14, 'キウイフルーツ'),
(15, '牛肉'),
(16, 'くるみ'),
(17, 'ごま'),
(18, 'さけ'),
(19, 'さば'),
(20, '大豆'),
(21, '鶏肉'),
(22, 'バナナ'),
(23, '豚肉'),
(24, 'まつたけ'),
(25, 'もも'),
(26, 'やまいも'),
(27, 'りんご'),
(28, 'ゼラチン');

INSERT INTO "Category" ("categoryId", "categoryName") VALUES 
(1, 'ソフトドリンク'),
(2, 'パスタ'),
(3, 'ピザ'),
(4, 'サラダ');

INSERT INTO "Store" ("storeId", "storeName") VALUES 
(1, '神保町本店'),
(2, '札幌支店'),
(3, 'ソウル支店');

INSERT INTO "StoreTable" ("tableId", "storeId", "tableName") VALUES 
(1, 1, '101'),
(2, 1, '102'),
(3, 1, '103'),
(4, 1, '104'),
(5, 1, '201'),
(6, 1, '202'),
(7, 1, '203'),
(8, 1, '204'),
(9, 2, '101'),
(10, 2, '102'),
(11, 3, '101');

INSERT INTO "Product" ("productId", "productName", "price", "categoryId", "description", "imageUrl", "isSoldOut") VALUES 
(1, 'コーラ', 280, 1, '炭酸飲料', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(2, 'カルピス', 170, 1, '乳酸菌飲料', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcalpis.jpg?alt=media&token=b144d301-69c6-43e9-917c-7c7997dc5d94', false),
(3, 'レモンティー', 280, 1, '紅茶飲料', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Flemontea.jpg?alt=media&token=80bb0395-c05e-4318-817e-d58726a0d4a2',false),
(4, 'ウーロン茶', 280, 1 , 'お茶', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Foolongtea.jpg?alt=media&token=f1f5da20-d282-4012-aaee-370aabfab153', false),
(5, 'アイスコーヒー', 280, 1, 'コーヒー飲料', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Ficecoffee.jpg?alt=media&token=75f579d2-e3eb-48c8-913c-5bcf980019e1', false),
(6, 'アイスカフェラテ', 280, 1, 'コーヒー飲料', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Ficecafelatte.jpg?alt=media&token=c421ae9d-f03e-43e8-bd97-ee73493a766c',false),
(7, 'ミートソーススパゲッティ', 680, 2, 'ミートソーススパゲッティ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fmeatsourcespaghetti.jpg?alt=media&token=e2b2400a-aa81-4e75-932b-47623d86a0e1', false),
(8, 'ペペロンチーノ', 680, 2, 'ペペロンチーノ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9A%E3%83%9A%E3%83%AD%E3%83%B3%E3%83%81%E3%83%BC%E3%83%8E.jpg?alt=media&token=bd17c72e-0b85-4c3a-9094-4174913ae610', false),
(9, 'ミラノ風ドリア', 780, 2, 'ミラノ風ドリア', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9F%E3%83%A9%E3%83%8E%E9%A2%A8%E3%83%89%E3%83%AA%E3%82%A2.jpg?alt=media&token=d6524550-2e69-43cf-8e75-6f63fbfc1b88', false),
(10, 'ボロネーゼスパゲッティ', 680, 2, 'ボロネーゼスパゲッティ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9C%E3%83%AD%E3%83%8D%E3%83%BC%E3%82%BC%E3%82%B9%E3%83%91%E3%82%B2%E3%83%83%E3%83%86%E3%82%A3.jpg?alt=media&token=8049f4ab-04f1-47b7-b050-b20efef232d4', false),
(11, 'カルボナーラ', 680, 2, 'カルボナーラ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%82%AB%E3%83%AB%E3%83%9C%E3%83%8A%E3%83%BC%E3%83%A9.jpg?alt=media&token=4bf04e6a-b04b-4743-8482-9a9caadcdc91', false),
(12, 'ドリア', 780, 2, 'ドリア', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%89%E3%83%AA%E3%82%A2.jpg?alt=media&token=08fcbb66-61c6-444a-88f4-588a3134b8b9', false),
(13, 'マルゲリータ', 980, 3, 'マルゲリータ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9E%E3%83%AB%E3%82%B2%E3%83%AA%E3%83%BC%E3%82%BF.jpg?alt=media&token=2540e78b-0d91-4c11-9f5c-84bfde0f77cb', false),
(14, 'マリナーラ', 980, 3, 'マリナーラ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9E%E3%83%AA%E3%83%8A%E3%83%BC%E3%83%A9.jpg?alt=media&token=19077aeb-08e3-4248-8ff4-7b8b444043e8', false),
(15, 'カプリチョーザ', 980, 3, 'カプリチョーザ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%82%AB%E3%83%97%E3%83%AA%E3%83%81%E3%83%A7%E3%83%BC%E3%82%B6.jpg?alt=media&token=866e94c6-4d96-46a8-b631-2366d827963e', false),
(16, 'マルゲリータスペシャル', 1620, 3, 'マルゲリータスペシャル', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%83%9E%E3%83%AB%E3%82%B2%E3%83%AA%E3%83%BC%E3%82%BF%E3%82%B9%E3%83%9A%E3%82%B7%E3%83%A3%E3%83%AB.jpg?alt=media&token=cf1b187c-7fb5-40fb-a5eb-277dd5bade70', false),
(17, 'アランナラ', 980, 3, 'アランナラ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%82%A2%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%A9.jpg?alt=media&token=aa745791-a86c-421a-81f1-0ca2c1492daf', false),
(18, 'サンプルピザ', 980, 3, 'サンプルピザ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E3%83%94%E3%82%B6.jpg?alt=media&token=a2750492-10a2-4f24-b740-7a2c7a06ceb8', false),
(19, 'シーザーサラダ', 620, 4, 'シーザーサラダ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2F%E3%82%B7%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%B5%E3%83%A9%E3%83%80.jpg?alt=media&token=3b8e305f-36e0-4d31-98a8-8bd7ae4f0b4c', false),
(20, 'オレンジジュース', 190, 1, 'オレンジジュース', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Forangejuice.jpg?alt=media&token=379c1f5e-3ab8-475a-b0e2-be281ca919be', false),
(21, 'メロンソーダ', 190, 1, 'メロンソーダ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fmelonsoda.jpg?alt=media&token=cff76c5a-3210-4522-9336-c4ee6123c8fe', false),
(22, 'リンゴジュース', 170, 1, 'リンゴジュース', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fapplejuice.jpg?alt=media&token=3e2ec8db-2558-45a1-ab1b-80a5581e1776', false),
(23, 'ココア', 220, 1, 'ここあ', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcocoa.jpg?alt=media&token=e4c7f994-652d-42eb-8857-1e3d67145f0c', false);

INSERT INTO "Ingredient" ("ingredientId", "ingredientName") VALUES 
(1, 'エビ'),
(2, 'カニ'),
(3, '小麦'),
(4, 'そば'),
(5, '卵'),
(6, '乳'),
(7, 'ピーナッツ'),
(8, 'アーモンド'),
(9, 'あわび'),
(10, 'いか'),
(11, 'いくら'),
(12, 'オレンジ'),
(13, 'カシューナッツ'),
(14, 'キウイフルーツ'),
(15, '牛肉'),
(16, 'くるみ'),
(17, 'ごま'),
(18, 'さけ'),
(19, 'さば'),
(20, '大豆'),
(21, '鶏肉'),
(22, 'バナナ'),
(23, '豚肉'),
(24, 'まつたけ'),
(25, 'もも'),
(26, 'やまいも'),
(27, 'りんご'),
(28, 'ゼラチン'),
(29, 'トマト'),
(30, 'レタス'),
(31, '玉ねぎ'),
(32, 'パプリカ'),
(33, 'キャベツ'),
(34, 'ブロッコリー'),
(35, 'にんじん'),
(36, 'きゅうり'),
(37, 'ほうれん草'),
(38, 'アボカド'),
(39, 'オリーブ'),
(40, 'アンチョビ'),
(41, 'ツナ'),
(42, 'ベーコン'),
(43, 'ハム'),
(44, 'サーモン'),
(45, 'イカ'),
(46, 'ホタテ'),
(47, 'マッシュルーム'),
(48, 'アスパラガス'),
(49, 'ズッキーニ'),
(50, 'オクラ'),
(51, 'レンコン'),
(52, 'ヤングコーン'),
(53, 'パセリ'),
(54, 'バジル'),
(55, 'ローズマリー'),
(56, 'タイム'),
(57, 'オレガノ'),
(58, 'セージ'),
(59, 'ミント'),
(60, 'コリアンダー'),
(61, 'シナモン'),
(62, '砂糖');

INSERT INTO "UserPreference" ("userPreferenceId", "ingredientType", "ingredientId", "userId") VALUES 
(1, 'LIKE', 5, 'user1'),
(2, 'LIKE', 15, 'user1'),
(3, 'LIKE', 25, 'user1'),
(4, 'DISLIKE', 31, 'user1'),
(5, 'DISLIKE', 29, 'user1');

INSERT INTO "UserAllergy" ("userAllergyId", "userId", "allergyId") VALUES 
(1, 'user1', 1),
(2, 'user1', 2),
(3, 'user1', 3),
(4, 'user1', 28);

INSERT INTO "ProductAllergy" ("productAllergyId", "productId", "allergyId") VALUES 
(1, 19, 1),
(2, 19, 6),
(3, 19, 5),
(4, 19, 5),
(5, 7, 3),
(6, 7, 15),
(7, 11, 3),
(8, 11, 5),
(9, 11, 23);

INSERT INTO "ProductIngredient" ("productIngredientId", "productId", "ingredientId") VALUES 
(1, 7, 3),
(2, 7, 15),
(3, 7, 20),
(4, 7, 31),
(5, 7, 35),
(6, 7, 62);

INSERT INTO "Menu" ("menuId", "menuCategoryName", "displayOrder") VALUES 
(1, 'ドリンク', 1),
(2, 'パスタ', 2),
(3, 'ピザ', 3),
(4, 'サラダ', 4);

INSERT INTO "MenuProduct" ("menuProductId", "menuId", "productId", "pages", "displayOrder") VALUES 
(1, 1, 1, 1, 1),
(2, 1, 2, 1, 2),
(3, 1, 3, 1, 3),
(4, 1, 4, 1, 4),
(5, 1, 5, 1, 5),
(6, 1, 6, 1, 6),
(7, 2, 7, 1, 1),
(8, 2, 8, 1, 2),
(9, 2, 9, 1, 3),
(10, 2, 10, 1, 4),
(11, 2, 11, 1, 5),
(12, 2, 12, 1, 6),
(13, 3, 13, 1, 1),
(14, 3, 14, 1, 2),
(15, 3, 15, 1, 3),
(16, 3, 16, 1, 4),
(17, 3, 17, 1, 5),
(18, 3, 18, 1, 6),
(19, 4, 19, 1, 1),
(20, 1, 1, 2, 4),
(21, 1, 2, 2, 3),
(22, 1, 3, 2, 2),
(23, 1, 4, 2, 1);

INSERT INTO "Order" ("orderId", "orderedAt", "tableId") VALUES 
(1, current_timestamp, 1),
(2, current_timestamp, 2),
(3, current_timestamp, 2);

INSERT INTO "OrderDetail" ("orderDetailId", "orderId", "productId", "quantity", "orderStatus") VALUES 
(1, 1, 1, 1, 'COOKING'),
(2, 1, 7, 1, 'COOKING'),
(3, 1, 19, 1, 'COOKING'),
(4, 2, 3, 1, 'COOKING');

INSERT INTO "OrderUser" ("orderUserId", "orderId", "userId") VALUES 
(1, 1, 'user1'),
(2, 2, 'user2');

INSERT INTO "StoreTableStatus" ("storeTableStatusId", "tableId", "status", "numberOfPeople", "calling") VALUES 
(1, 1, 'EMPTY', 0, false),
(2, 2, 'USING', 2, true),
(3, 3, 'USING', 4, false),
(4, 4, 'USING', 4, true),
(5, 5, 'EMPTY', 0, false),
(6, 6, 'USING', 5, false),
(7, 7, 'USING', 1, false),
(8, 8, 'EMPTY', 0, false),
(9, 9, 'EMPTY', 0, false),
(10, 10, 'EMPTY', 0, false),
(11, 11, 'EMPTY', 0, false);

INSERT INTO "OrderHistoryLog" ("orderId", "orderedAt", "tableId") VALUES 
(1, '2023-11-01 12:30:00', 1),
(2, '2023-11-02 13:15:00', 2),
(3, '2023-11-02 14:05:00', 3);

INSERT INTO "OrderDetailLog" ("orderHistoryLogId", "productId", "quantity", "orderStatus") VALUES 
(1, 1, 2, 'SERVED'),
(1, 7, 1, 'SERVED'),
(2, 3, 1, 'SERVED'),
(2, 19, 1, 'SERVED'),
(3, 5, 1, 'SERVED'),
(3, 10, 1, 'SERVED'),
(3, 13, 1, 'SERVED');

SELECT setval(pg_get_serial_sequence('"Product"', 'productId'), (SELECT MAX("productId") FROM "Product") + 1);
SELECT setval(pg_get_serial_sequence('"ProductAllergy"', 'productAllergyId'), (SELECT MAX("productAllergyId") FROM "ProductAllergy") + 1);
SELECT setval(pg_get_serial_sequence('"ProductIngredient"', 'productIngredientId'), (SELECT MAX("productIngredientId") FROM "ProductIngredient") + 1);
SELECT setval(pg_get_serial_sequence('"UserPreference"', 'userPreferenceId'), (SELECT MAX("userPreferenceId") FROM "UserPreference") + 1);
SELECT setval(pg_get_serial_sequence('"UserAllergy"', 'userAllergyId'), (SELECT MAX("userAllergyId") FROM "UserAllergy") + 1);
SELECT setval(pg_get_serial_sequence('"Ingredient"', 'ingredientId'), (SELECT MAX("ingredientId") FROM "Ingredient") + 1);
SELECT setval(pg_get_serial_sequence('"Menu"', 'menuId'), (SELECT MAX("menuId") FROM "Menu") + 1);
SELECT setval(pg_get_serial_sequence('"MenuProduct"', 'menuProductId'), (SELECT MAX("menuProductId") FROM "MenuProduct") + 1);
SELECT setval(pg_get_serial_sequence('"Order"', 'orderId'), (SELECT MAX("orderId") FROM "Order") + 1);
SELECT setval(pg_get_serial_sequence('"OrderDetail"', 'orderDetailId'), (SELECT MAX("orderDetailId") FROM "OrderDetail") + 1);
SELECT setval(pg_get_serial_sequence('"OrderUser"', 'orderUserId'), (SELECT MAX("orderUserId") FROM "OrderUser") + 1);
SELECT setval(pg_get_serial_sequence('"StoreTableStatus"', 'storeTableStatusId'), (SELECT MAX("storeTableStatusId") FROM "StoreTableStatus") + 1);
SELECT setval(pg_get_serial_sequence('"StoreTable"', 'tableId'), (SELECT MAX("tableId") FROM "StoreTable") + 1);
SELECT setval(pg_get_serial_sequence('"Store"', 'storeId'), (SELECT MAX("storeId") FROM "Store") + 1);
SELECT setval(pg_get_serial_sequence('"Category"', 'categoryId'), (SELECT MAX("categoryId") FROM "Category") + 1);
SELECT setval(pg_get_serial_sequence('"Allergy"', 'allergyId'), (SELECT MAX("allergyId") FROM "Allergy") + 1);
SELECT setval(pg_get_serial_sequence('"OrderHistoryLog"', 'orderHistoryLogId'), (SELECT MAX("orderHistoryLogId") FROM "OrderHistoryLog") + 1);
SELECT setval(pg_get_serial_sequence('"OrderDetailLog"', 'orderDetailLogId'), (SELECT MAX("orderDetailLogId") FROM "OrderDetailLog") + 1);

-- 本番用テストデータ
INSERT INTO "Allergy" ("allergyId", "allergyName") VALUES 
(1, '小麦'),
(2, 'そば'),
(3, '大豆'),
(4, 'ごま'),
(5, '卵'),
(6, '乳'),
(7, '牛肉'),
(8, '鶏肉'),
(9, '豚肉'),
(10, 'さば'),
(11, 'かに'),
(12, 'えび'),
(13, 'あわび'),
(14, 'いか'),
(15, 'いくら'),
(16, 'ゼラチン'),
(17, 'さけ'),
(18, 'カシューナッツ'),
(19, 'アーモンド'),
(20, 'くるみ'),
(21, 'まつたけ'),
(22, 'ピーナッツ'),
(23, 'もも'),
(24, 'りんご'),
(25, 'バナナ'),
(26, 'キウイ'),
(27, 'オレンジ'),
(28, 'やまいも');

INSERT INTO "Category" ("categoryId", "categoryName") VALUES 
(1, 'おつまみ'),
(2, 'やきとり'),
(3, '一品料理'),
(4, 'アルコール類'),
(5, 'ソフトドリンク');

INSERT INTO "Product" ("productId", "productName", "price", "categoryId", "description", "imageUrl", "isSoldOut") VALUES 
(1, 'えだまめ', 300, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(2, '塩キャベツ', 250, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(3, 'チヂミ', 300, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(4, 'キムチ', 300, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(5, '韓国のり', 200, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(6, 'オニオンリング', 380, 1, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(7, 'ももたれ', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(8, 'ももしお', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(9, 'かわたれ', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(10, 'かわしお', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(11, 'つくね', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(12, 'ねぎま', 540, 2, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(13, 'チーズボール', 460, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(14, '焼き餃子', 480, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(15, 'コーンバター', 460, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(16, 'エビマヨ', 500, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(17, 'だしまき', 360, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(18, 'ポテト', 450, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(19, 'からあげ', 500, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(20, '軟骨揚げ', 500, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(21, 'エビフライ', 500, 3, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(22, '生ビール', 560, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(23, '角ハイボール', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(24, 'コークハイ', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(25, 'レモンサワー', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(26, 'ウーロンハイ', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(27, 'カルピスサワー', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(28, 'ライムサワー', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(29, '梅サワー', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(30, '日本酒', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(31, '梅酒', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(32, 'カシスオレンジ', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(33, 'カシスグレープ', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(34, 'ウィスキー', 480, 4, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(35, 'コーラ', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(36, 'オレンジ', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(37, 'カルピス', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(38, '王老吉', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(39, 'ウーロン茶', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false),
(40, 'コーヒー', 200, 5, '説明', 'https://firebasestorage.googleapis.com/v0/b/procon-72310.appspot.com/o/images%2Fcola.jpg?alt=media&token=6ea63d0b-983f-47a7-8ffb-53ff19cea57b', false);

INSERT INTO "Ingredient" ("ingredientId", "ingredientName") VALUES 
(1, '小麦'),
(2, 'そば'),
(3, '大豆'),
(4, 'ごま'),
(5, '卵'),
(6, '乳'),
(7, '牛肉'),
(8, '鶏肉'),
(9, '豚肉'),
(10, 'さば'),
(11, 'かに'),
(12, 'えび'),
(13, 'あわび'),
(14, 'いか'),
(15, 'いくら'),
(16, 'ゼラチン'),
(17, 'さけ'),
(18, 'カシューナッツ'),
(19, 'アーモンド'),
(20, 'くるみ'),
(21, 'まつたけ'),
(22, 'ピーナッツ'),
(23, 'もも'),
(24, 'りんご'),
(25, 'バナナ'),
(26, 'キウイ'),
(27, 'オレンジ'),
(28, 'やまいも'),
(29, 'キャベツ'),
(30, '白菜'),
(31, '唐辛子'),
(32, '海苔'),
(33, '玉ねぎ'),
(34, 'ネギ'),
(35, 'トウモロコシ'),
(36, 'じゃがいも'),
(37, 'チーズ'),
(38, 'バター'),
(39, 'マヨネーズ'),
(40, 'かつお節'),
(41, 'にんじん'),
(42, 'ピーマン'),
(43, 'しいたけ'),
(44, 'えのきだけ'),
(45, '豆腐'),
(46, 'ほうれん草'),
(47, 'ブロッコリー'),
(48, 'レタス'),
(49, 'アボカド'),
(50, 'パセリ'),
(51, 'ミント'),
(52, 'ライム'),
(53, 'レモン'),
(54, 'オリーブオイル'),
(55, 'にんにく'),
(56, '生姜');

INSERT INTO "Menu" ("menuId", "menuCategoryName", "displayOrder") VALUES 
(1, 'おつまみ', 1),
(2, 'やきとり', 2),
(3, '一品料理', 3),
(4, 'アルコール類', 4),
(5, 'ソフトドリンク', 5);

INSERT INTO "MenuProduct" ("menuProductId", "menuId", "productId", "pages", "displayOrder") VALUES 
(1, 1, 1, 1, 1),
(2, 1, 2, 1, 2),
(3, 1, 3, 1, 3),
(4, 1, 4, 1, 4),
(5, 1, 5, 1, 5),
(6, 1, 6, 1, 6),
(7, 2, 7, 1, 1),
(8, 2, 8, 1, 2),
(9, 2, 9, 1, 3),
(10, 2, 10, 1, 4),
(11, 2, 11, 1, 5),
(12, 2, 12, 1, 6),
(13, 3, 13, 1, 1),
(14, 3, 14, 1, 2),
(15, 3, 15, 1, 3),
(16, 3, 16, 1, 4),
(17, 3, 17, 1, 5),
(18, 3, 18, 1, 6),
(19, 3, 19, 2, 1),
(20, 3, 20, 2, 2),
(21, 3, 21, 2, 3),
(22, 4, 22, 1, 1),
(23, 4, 23, 1, 2),
(24, 4, 24, 1, 3),
(25, 4, 25, 1, 4),
(26, 4, 26, 1, 5),
(27, 4, 27, 1, 6),
(28, 4, 28, 2, 1),
(29, 4, 29, 2, 2),
(30, 4, 30, 2, 3),
(31, 4, 31, 2, 4),
(32, 4, 32, 2, 5),
(33, 4, 33, 2, 6),
(34, 4, 34, 3, 1),
(35, 5, 35, 1, 1),
(36, 5, 36, 1, 2),
(37, 5, 37, 1, 3),
(38, 5, 38, 1, 4),
(39, 5, 39, 1, 5),
(40, 5, 40, 1, 6);

INSERT INTO "Store" ("storeId", "storeName") VALUES 
(1, '神保町本店'),
(2, '札幌支店'),
(3, '川口支店');

INSERT INTO "StoreTable" ("tableId", "storeId", "tableName") VALUES 
(1, 1, '101'),
(2, 1, '102'),
(3, 1, '103'),
(4, 1, '104'),
(5, 1, '105'),
(6, 1, '106'),
(7, 1, '107'),
(8, 1, '108'),
(9, 1, '109'),
(10, 2, '101'),
(11, 2, '102'),
(12, 2, '103'),
(13, 2, '104'),
(14, 2, '105'),
(15, 2, '106'),
(16, 2, '201'),
(17, 2, '202'),
(18, 2, '203'),
(19, 2, '204'),
(20, 2, '205'),
(21, 3, '101'),
(22, 3, '102'),
(23, 3, '103'),
(24, 3, '104');

INSERT INTO "StoreTableStatus" ("storeTableStatusId", "tableId", "status", "numberOfPeople", "calling") VALUES 
(1, 1, 'EMPTY', 0, false),
(2, 2, 'EMPTY', 0, false),
(3, 3, 'EMPTY', 0, false),
(4, 4, 'EMPTY', 4, false),
(5, 5, 'EMPTY', 0, false),
(6, 6, 'EMPTY', 0, false),
(7, 7, 'EMPTY', 0, false),
(8, 8, 'EMPTY', 0, false),
(9, 9, 'EMPTY', 0, false),
(10, 10, 'EMPTY', 0, false),
(11, 11, 'EMPTY', 0, false),
(12, 12, 'EMPTY', 0, false),
(13, 13, 'EMPTY', 0, false),
(14, 14, 'EMPTY', 0, false),
(15, 15, 'EMPTY', 0, false),
(16, 16, 'EMPTY', 0, false),
(17, 17, 'EMPTY', 0, false),
(18, 18, 'EMPTY', 0, false),
(19, 19, 'EMPTY', 0, false),
(20, 20, 'EMPTY', 0, false),
(21, 21, 'EMPTY', 0, false),
(22, 22, 'EMPTY', 0, false),
(23, 23, 'EMPTY', 0, false),
(24, 24, 'EMPTY', 0, false);

SELECT setval(pg_get_serial_sequence('"Product"', 'productId'), (SELECT MAX("productId") FROM "Product") + 1);
SELECT setval(pg_get_serial_sequence('"ProductAllergy"', 'productAllergyId'), (SELECT MAX("productAllergyId") FROM "ProductAllergy") + 1);
SELECT setval(pg_get_serial_sequence('"ProductIngredient"', 'productIngredientId'), (SELECT MAX("productIngredientId") FROM "ProductIngredient") + 1);
SELECT setval(pg_get_serial_sequence('"UserPreference"', 'userPreferenceId'), (SELECT MAX("userPreferenceId") FROM "UserPreference") + 1);
SELECT setval(pg_get_serial_sequence('"UserAllergy"', 'userAllergyId'), (SELECT MAX("userAllergyId") FROM "UserAllergy") + 1);
SELECT setval(pg_get_serial_sequence('"Ingredient"', 'ingredientId'), (SELECT MAX("ingredientId") FROM "Ingredient") + 1);
SELECT setval(pg_get_serial_sequence('"Menu"', 'menuId'), (SELECT MAX("menuId") FROM "Menu") + 1);
SELECT setval(pg_get_serial_sequence('"MenuProduct"', 'menuProductId'), (SELECT MAX("menuProductId") FROM "MenuProduct") + 1);
SELECT setval(pg_get_serial_sequence('"Order"', 'orderId'), (SELECT MAX("orderId") FROM "Order") + 1);
SELECT setval(pg_get_serial_sequence('"OrderDetail"', 'orderDetailId'), (SELECT MAX("orderDetailId") FROM "OrderDetail") + 1);
SELECT setval(pg_get_serial_sequence('"OrderUser"', 'orderUserId'), (SELECT MAX("orderUserId") FROM "OrderUser") + 1);
SELECT setval(pg_get_serial_sequence('"StoreTableStatus"', 'storeTableStatusId'), (SELECT MAX("storeTableStatusId") FROM "StoreTableStatus") + 1);
SELECT setval(pg_get_serial_sequence('"StoreTable"', 'tableId'), (SELECT MAX("tableId") FROM "StoreTable") + 1);
SELECT setval(pg_get_serial_sequence('"Store"', 'storeId'), (SELECT MAX("storeId") FROM "Store") + 1);
SELECT setval(pg_get_serial_sequence('"Category"', 'categoryId'), (SELECT MAX("categoryId") FROM "Category") + 1);
SELECT setval(pg_get_serial_sequence('"Allergy"', 'allergyId'), (SELECT MAX("allergyId") FROM "Allergy") + 1);
SELECT setval(pg_get_serial_sequence('"OrderHistoryLog"', 'orderHistoryLogId'), (SELECT MAX("orderHistoryLogId") FROM "OrderHistoryLog") + 1);
SELECT setval(pg_get_serial_sequence('"OrderDetailLog"', 'orderDetailLogId'), (SELECT MAX("orderDetailLogId") FROM "OrderDetailLog") + 1);
