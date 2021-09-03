DROP DATABASE IF EXISTS onboarding;

create database onboarding;

USE  onboarding;
set foreign_key_checks = 0;

CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `addressType` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `address3` varchar(20) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `address_user_idx` (`userId`),
  CONSTRAINT `address_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `asset` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `assetType` varchar(50) NOT NULL,
  `assetOwner` varchar(50) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `serialNumber` varchar(50) DEFAULT NULL,
  `processorType` varchar(25) DEFAULT NULL,
  `processorGeneration` varchar(25) DEFAULT NULL,
  `ram` varchar(25) DEFAULT NULL,
  `storageType` varchar(25) DEFAULT NULL,
  `storageSpace` varchar(25) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `asset_user_idx` (`userId`),
  CONSTRAINT `asset_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `candidate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `statusCode` varchar(5) NOT NULL DEFAULT 'CC',
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `homePhone` varchar(15) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `jobId` int DEFAULT NULL,
  `panCard` varchar(25) DEFAULT NULL,
  `passport` varchar(50) DEFAULT NULL,
  `aadhaarCard` varchar(25) DEFAULT NULL,
  `parentFirstName` varchar(50) NULL,
  `parentMiddleName` varchar(50) NULL,
  `parentLastName` varchar(50) NULL,
  `emergencyContactName` varchar(100) NULL,
  `emergencyEmail` varchar(100) NULL,
  `emergencyPhone` varchar(15) NULL,
  `totalExperience` varchar(50) NULL,
  `currentSalary` varchar(50) NULL,
  `recruiterId` varchar(36) DEFAULT NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `candidate_user` (`userId`),
  KEY `recruiter` (`recruiterId`),
  KEY `candidate_job_idx` (`jobId`),
  KEY `candidate_status_idx` (`statusCode`),
  CONSTRAINT `candidate_job` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`),
  CONSTRAINT `candidate_status` FOREIGN KEY (`statusCode`) REFERENCES `status` (`statusCode`),
  CONSTRAINT `candidate_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `recruiter` FOREIGN KEY (`recruiterId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;


CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientName` varchar(100) NOT NULL,
  `location` varchar(100) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `status` enum('approved','rejected','uploaded') DEFAULT 'uploaded',
  `documentType` varchar(50) DEFAULT NULL,
  `documentName` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `fileUrl` varchar(250) NOT NULL,
  `fileName` varchar(250) NOT NULL,
  `fileExtension` varchar(25) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `document_user_idx` (`userId`),
  CONSTRAINT `document_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `institute` varchar(50) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `completionDate` date DEFAULT NULL,
  `degree` varchar(50) DEFAULT NULL,
  `grade` varchar(50) DEFAULT NULL,
  `subjects` varchar(50) DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `education_user_idx` (`userId`),
  KEY `education_document` (`documentid`),
  CONSTRAINT `education_document` FOREIGN KEY (`documentid`) REFERENCES `document` (`id`),
  CONSTRAINT `education_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `employee` (
  `id`int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `homePhone` varchar(15) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `dateHire` date DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `managerId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `detail_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `employer` varchar(50) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `completionDate` date DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `ctc` varchar(20) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `skills` varchar(100) DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `experience_user_idx` (`userId`),
  KEY `experience_document` (`documentid`),
  CONSTRAINT `experience_document` FOREIGN KEY (`documentid`) REFERENCES `document` (`id`),
  CONSTRAINT `experience_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int DEFAULT NULL,
  `jobCode` varchar(50) NOT NULL,
  `description` varchar(255) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobCode` (`jobCode`),
  KEY `job_client_idx` (`clientId`),
  CONSTRAINT `job_client` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `metadocdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `metaId` int NOT NULL,
  `metaHeader` varchar(50) NOT NULL,
  `metaValue` varchar(255) DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `rowId` smallint DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `docdetail_user_idx` (`userId`),
  KEY `docdetail_meta_idx` (`metaId`),
  KEY `docdetail_document` (`documentid`),
  CONSTRAINT `docdetail_document` FOREIGN KEY (`documentid`) REFERENCES `document` (`id`),
  CONSTRAINT `docdetail_meta` FOREIGN KEY (`metaId`) REFERENCES `metadocmaster` (`id`),
  CONSTRAINT `docdetail_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `metadocmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `metaHeader` varchar(50) DEFAULT NULL,
  `fieldType` varchar(50) DEFAULT NULL,
  `sortOrder` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `fromEmail` varchar(50) DEFAULT NULL,
  `toEmail` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `emailType` varchar(25) DEFAULT NULL,
  `sendDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `notification_user_idx` (`userId`),
  CONSTRAINT `notification_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `offer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `candidateId` int NOT NULL,
  `offerStatus` varchar(50) DEFAULT NULL,
  `isAccepted` enum('yes','no') DEFAULT 'no',
  `offerDate` date DEFAULT NULL,
  `workDate` date DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `ctc` double DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `offer_user_idx` (`candidateId`),
  CONSTRAINT `offer_user` FOREIGN KEY (`candidateId`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `organization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgName` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `otherdoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `documentName` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `documentid` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `otherdoc_user_idx` (`userId`),
  KEY `otherdoc_document` (`documentid`),
  CONSTRAINT `otherdoc_document` FOREIGN KEY (`documentid`) REFERENCES `document` (`id`),
  CONSTRAINT `otherdoc_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `offer` (
  `offerId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `offerStatus` varchar(50) DEFAULT NULL,
  `isAccepted` enum('yes','no') DEFAULT 'no',
  `offerDate` date DEFAULT NULL,
  `hireDate` date DEFAULT NULL,
  `workStartDate` date DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `ctc` double DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `client` varchar(50) NOT NULL,
  `assetId` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`offerId`),
  KEY `offer_user_idx` (`userId`),
  CONSTRAINT `offer_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `description` varchar(25) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB;

CREATE TABLE `status` (
  `statusCode` varchar(5) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`statusCode`),
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB;

CREATE TABLE `user` (
  `userId` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwordHash` varchar(50) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `lastLogin` datetime NOT NULL,
  `token` varchar(50) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `orgId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userEmail` (`email`),
  UNIQUE KEY `userContact` (`mobile`),
  KEY `user_org_idx` (`orgId`),
  CONSTRAINT `user_org` FOREIGN KEY (`orgId`) REFERENCES `organization` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `userrole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `roleId` int NOT NULL,
  `isDefault` enum('yes','no') DEFAULT 'yes',
  KEY `userid_idx` (`userId`),
  KEY `roleid_idx` (`roleId`),
  CONSTRAINT `role_roleid` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`),
  CONSTRAINT `role_userid` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

CREATE TABLE `workflow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `workflow_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB;

use onboarding;
set foreign_key_checks = 0;
  truncate table status;
  truncate table user;
  truncate table userrole;
  truncate table employee;
  truncate table organization;

INSERT INTO organization(orgName,createdBy,updatedBy)
VALUES ('Careator', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3');

insert into role(role, description, createdBy, updatedby)
values
	('Admin', 'Administrator', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3'),
	('Leader', 'Leadership', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3'),
  ('AM', 'Account Manager', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3'),
  ('HR', 'Human Resource', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3'),
  ('Recruiter', 'Recruiter', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3'),
  ('Candidate', 'Candidate', '5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3');

insert into status(statuscode, status)
values
  ('CC', 'Candidate Created'),
  ('RRD','Recruiter Review Done'),
  ('DU','Documents Uploaded'),
  ('CAO','Candidate Accepted Offer'),
  ('CRO','Candidate Rejected Offer'),
  ('HRD','HR Review Done'),
  ('OR','Offer Released'),
  ('ORI','Offer Request Initiated'),
  ('ORA','Offer Request Approved'),
  ('ORR','Offer Request Rejected');

INSERT INTO user(userId, email, passwordHash, mobile, lastLogin, createdBy, updatedBy, orgId, firstTimeLogin)
VALUES('5f5258d0-4d70-45d2-8347-aa1637648ab3','abc@careator.com','$2b$10$GhcA7NwgezMQJmPhItPklOj3F2bH0Ecm5kn4R1.c7BGkwO1Juou6G','9022515434', current_timestamp(),'5f5258d0-4d70-45d2-8347-aa1637648ab3', '5f5258d0-4d70-45d2-8347-aa1637648ab3',1,0);

insert into userrole(userid, roleid)
values('5f5258d0-4d70-45d2-8347-aa1637648ab3', 1);

INSERT INTO employee(firstName,lastName,designation, createdBy,updatedBy,userId)
VALUES('Administator','Careator','Administrator', '5f5258d0-4d70-45d2-8347-aa1637648ab3','5f5258d0-4d70-45d2-8347-aa1637648ab3','5f5258d0-4d70-45d2-8347-aa1637648ab3');

set foreign_key_checks = 1;