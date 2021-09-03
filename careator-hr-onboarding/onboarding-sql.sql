CREATE DATABASE onboarding;

USE onboarding;

CREATE TABLE `activity` (
  `id` int NOT NULL,
  `activity` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `address` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
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
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `address_user_idx` (`userId`),
  CONSTRAINT `address_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `candidate` (
  `id` int NOT NULL,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `statusCode` varchar(5) NOT NULL DEFAULT 'CC',
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `homePhone` varchar(15) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `jobId` int DEFAULT NULL,
  `panCard` varchar(25) DEFAULT NULL,
  `passport` varchar(25) DEFAULT NULL,
  `aadhaarCard` varchar(25) DEFAULT NULL,
  `parentFirstName` varchar(50) NOT NULL,
  `parentMiddleName` varchar(50) NOT NULL,
  `parentLastName` varchar(50) NOT NULL,
  `emergencyContactName` varchar(100) NOT NULL,
  `emergencyEmail` varchar(100) NOT NULL,
  `emergencyPhone` varchar(15) NOT NULL,
  `totalExperience` varchar(50) NOT NULL,
  `currentSalary` double DEFAULT NULL,
  `recruiterId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `candidate_user` (`userId`),
  KEY `recruiter` (`recruiterId`),
  KEY `candidate_job_idx` (`jobId`),
  KEY `candidate_status_idx` (`statusCode`),
  CONSTRAINT `candidate_job` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`),
  CONSTRAINT `candidate_status` FOREIGN KEY (`statusCode`) REFERENCES `status` (`status`),
  CONSTRAINT `candidate_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `recruiter` FOREIGN KEY (`recruiterId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `client` (
  `id` int NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `document` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
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
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `document_user_idx` (`userId`),
  CONSTRAINT `document_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `employee` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
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
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `detail_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `job` (
  `id` int NOT NULL,
  `clientId` int DEFAULT NULL,
  `jobCode` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobCode` (`jobCode`),
  KEY `job_client_idx` (`clientId`),
  CONSTRAINT `job_client` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `metadocdetail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `metaId` bigint unsigned NOT NULL,
  `metaHeader` varchar(50) NOT NULL,
  `metaValue` varchar(255) DEFAULT NULL,
  `documentid` bigint unsigned DEFAULT NULL,
  `rowId` smallint DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `docdetail_user_idx` (`userId`),
  KEY `docdetail_meta_idx` (`metaId`),
  KEY `docdetail_document` (`documentid`),
  CONSTRAINT `docdetail_document` FOREIGN KEY (`documentid`) REFERENCES `document` (`id`),
  CONSTRAINT `docdetail_meta` FOREIGN KEY (`metaId`) REFERENCES `metadocmaster` (`id`),
  CONSTRAINT `docdetail_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

CREATE TABLE `metadocmaster` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `metaHeader` varchar(50) DEFAULT NULL,
  `fieldType` varchar(50) DEFAULT NULL,
  `sortOrder` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `notification` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `fromEmail` varchar(50) DEFAULT NULL,
  `toEmail` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `emailType` varchar(25) DEFAULT NULL,
  `sendDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `notification_user_idx` (`userId`),
  CONSTRAINT `notification_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `offer` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
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
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `offer_user_idx` (`candidateId`),
  CONSTRAINT `offer_user` FOREIGN KEY (`candidateId`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `organization` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `orgName` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `role` (
  `id` int NOT NULL,
  `role` varchar(255) NOT NULL,
  `description` varchar(25) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `status` (
  `id` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `statusCode` varchar(5) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwordHash` varchar(50) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `lastLogin` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  `orgId` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userEmail` (`email`),
  UNIQUE KEY `userContact` (`mobile`),
  KEY `user_org_idx` (`orgId`),
  CONSTRAINT `user_org` FOREIGN KEY (`orgId`) REFERENCES `organization` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userrole` (
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `roleId` int NOT NULL,
  `isDefault` enum('yes','no') DEFAULT 'no',
  KEY `userid_idx` (`userId`),
  KEY `roleid_idx` (`roleId`),
  CONSTRAINT `role_roleid` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`),
  CONSTRAINT `role_userid` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `workflow` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `candidateId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `activityId` int NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(50) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `isActive` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `workflow_user_idx` (`userId`),
  KEY `workflow_activity_idx` (`activityId`),
  CONSTRAINT `workflow_activity` FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`),
  CONSTRAINT `workflow_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
