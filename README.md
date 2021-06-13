기본으로 Localhost 세팅이 되어있음.   
외부접속을 하려면 src 폴더안의 ipConfig.js를 수정하고 server폴더의 chat.js의 cors 설정을 확인해야하며 1935포트, 3000포트 3001포트 3002포트, 8000포트가 풀려있어야함.   
RTMP: 1935, React: 3000, Express: 3001, Chat: 3002, HLS: 8000 포트 사용.   
FFMPEG를 다운받아 c:\FFMPEG에 압축해제해야 HLS로 변환이 가능함.   
git clone -> npm install -> npm start시 실행.   
npm start 시 모듈을 찾을 수 없다고 에러가 나면 해당 모듈을 npm install -g 를 통해 글로벌 설치했던 모듈이므로 설치해야함 어떤 모듈인지 너무 많아서 기억이 나지 않음.   

쿼리
--------------------------------------------------------
--  파일이 생성됨 - 일요일-6월-13-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table BOARD
--------------------------------------------------------
CREATE USER CAPSTONE2 IDENTIFIED BY 1234;   
GRANT DBA, RESOURCE, CONNECT TO CAPSTONE2;   
  CREATE TABLE "CAPSTONE"."BOARD" 
   (	"IDX" NUMBER, 
	"ID" VARCHAR2(10 BYTE), 
	"TITLE" VARCHAR2(50 BYTE), 
	"CONTENT" VARCHAR2(500 BYTE), 
	"POST_DATE" DATE, 
	"VIEW_COUNT" NUMBER, 
	"POST_LOCK" NUMBER, 
	"V_IDX" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table REPLY
--------------------------------------------------------

  CREATE TABLE "CAPSTONE"."REPLY" 
   (	"IDX" NUMBER, 
	"B_IDX" NUMBER, 
	"ID" VARCHAR2(10 BYTE), 
	"CONTENT" VARCHAR2(200 BYTE), 
	"REP_DATE" DATE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table USERS
--------------------------------------------------------

  CREATE TABLE "CAPSTONE"."USERS" 
   (	"ID" VARCHAR2(10 BYTE), 
	"PASSWORD" VARCHAR2(150 BYTE), 
	"NAME" VARCHAR2(30 BYTE), 
	"PHONE" VARCHAR2(11 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table VOD
--------------------------------------------------------

  CREATE TABLE "CAPSTONE"."VOD" 
   (	"IDX" NUMBER, 
	"TITLE" VARCHAR2(50 BYTE), 
	"CATEGORY" VARCHAR2(30 BYTE), 
	"CONTENT" VARCHAR2(500 BYTE), 
	"VIEW_COUNT" NUMBER, 
	"U_DATE" DATE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into CAPSTONE.BOARD
SET DEFINE OFF;
Insert into CAPSTONE.BOARD (IDX,ID,TITLE,CONTENT,POST_DATE,VIEW_COUNT,POST_LOCK,V_IDX) values (1,'admin','게시글 테스트 1','가나다라',to_date('21/06/11','RR/MM/DD'),4,0,40001);
Insert into CAPSTONE.BOARD (IDX,ID,TITLE,CONTENT,POST_DATE,VIEW_COUNT,POST_LOCK,V_IDX) values (2,'admin','테스트 2','ㅁㄴㅇㄹ',to_date('21/06/11','RR/MM/DD'),1,0,10003);
Insert into CAPSTONE.BOARD (IDX,ID,TITLE,CONTENT,POST_DATE,VIEW_COUNT,POST_LOCK,V_IDX) values (3,'1234','테스트 3','테스트',to_date('21/06/11','RR/MM/DD'),10,0,10001);
Insert into CAPSTONE.BOARD (IDX,ID,TITLE,CONTENT,POST_DATE,VIEW_COUNT,POST_LOCK,V_IDX) values (4,'admin','테스트 5','ㅁㄴㅇㄹㅁㄴㅇㄹ',to_date('21/06/11','RR/MM/DD'),3,0,20003);
REM INSERTING into CAPSTONE.REPLY
SET DEFINE OFF;
REM INSERTING into CAPSTONE.USERS
SET DEFINE OFF;
Insert into CAPSTONE.USERS (ID,PASSWORD,NAME,PHONE) values ('admin','$2b$10$yFgQSIYYv3snq3kZNfbwROStYjFstd7wtLMGvU6ufpzHdeMkutKa.','관리자','1111');
Insert into CAPSTONE.USERS (ID,PASSWORD,NAME,PHONE) values ('1234','$2b$10$7sAtIBvdnS9i8G6NLKGm0.8A/G3VPlz3Wi8fjvVux1d8XDoTxCIV6','오동혁','1234');
Insert into CAPSTONE.USERS (ID,PASSWORD,NAME,PHONE) values ('testUser1','$2b$10$BXc2Mn7ps9l/KYGElsR/nu.8pFY6zXibkqnAQiyeDZcKHwLAsOzcC','테스트사용자','01011112222');
Insert into CAPSTONE.USERS (ID,PASSWORD,NAME,PHONE) values ('hihello','$2b$10$BN9d8wnDOHV5kEcXx1twmOR1GA1oPiIcY6GP5Gfq8pKXOrESgb47e','GoHome','1234');
REM INSERTING into CAPSTONE.VOD
SET DEFINE OFF;
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (20001,'빈센조','드라마','가나다라마바사',22,to_date('21/06/04','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (40001,'명탐정코난','애니메이션','ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ',9,to_date('21/06/04','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (20003,'슬기로운 의사생활','드라마','가나다라ㅁㄴㅇㄻㄴㅇ',1,to_date('21/06/11','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (40002,'짱구는 못말려','애니메이션','ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ',3,to_date('21/06/04','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (10001,'신서유기','예능','ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ',3,to_date('21/06/04','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (20002,'마우스','드라마','ㅁㄴㅇㅎㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ',7,to_date('21/06/04','RR/MM/DD'));
Insert into CAPSTONE.VOD (IDX,TITLE,CATEGORY,CONTENT,VIEW_COUNT,U_DATE) values (10003,'맛있는녀석들','예능','마음 푹 놓고, 믿고 따르는! 맛 좀 아는 뚱 MC들의 친절한 고급 제안서 맛있는 녀석들',18,to_date('21/06/05','RR/MM/DD'));
--------------------------------------------------------
--  DDL for Index REPLY_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CAPSTONE"."REPLY_PK" ON "CAPSTONE"."REPLY" ("IDX") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index VOD_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CAPSTONE"."VOD_PK" ON "CAPSTONE"."VOD" ("IDX") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index TABLE1_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CAPSTONE"."TABLE1_PK" ON "CAPSTONE"."BOARD" ("IDX") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index USER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CAPSTONE"."USER_PK" ON "CAPSTONE"."USERS" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table USERS
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."USERS" MODIFY ("PHONE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."USERS" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."USERS" MODIFY ("PASSWORD" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."USERS" ADD CONSTRAINT "USER_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Constraints for Table BOARD
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("IDX" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("TITLE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("CONTENT" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("POST_DATE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("VIEW_COUNT" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("POST_LOCK" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."BOARD" ADD CONSTRAINT "TABLE1_PK" PRIMARY KEY ("IDX")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "CAPSTONE"."BOARD" MODIFY ("V_IDX" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table REPLY
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."REPLY" MODIFY ("IDX" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."REPLY" MODIFY ("B_IDX" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."REPLY" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."REPLY" MODIFY ("CONTENT" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."REPLY" MODIFY ("REP_DATE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."REPLY" ADD CONSTRAINT "REPLY_PK" PRIMARY KEY ("IDX")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Constraints for Table VOD
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("U_DATE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("VIEW_COUNT" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("CONTENT" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("IDX" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("TITLE" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" MODIFY ("CATEGORY" NOT NULL ENABLE);
  ALTER TABLE "CAPSTONE"."VOD" ADD CONSTRAINT "VOD_PK" PRIMARY KEY ("IDX")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table BOARD
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."BOARD" ADD CONSTRAINT "BOARD_FK1" FOREIGN KEY ("V_IDX")
	  REFERENCES "CAPSTONE"."VOD" ("IDX") ON DELETE CASCADE ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table REPLY
--------------------------------------------------------

  ALTER TABLE "CAPSTONE"."REPLY" ADD CONSTRAINT "REPLY_FK1" FOREIGN KEY ("B_IDX")
	  REFERENCES "CAPSTONE"."BOARD" ("IDX") ON DELETE CASCADE ENABLE;
