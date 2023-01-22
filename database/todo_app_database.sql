-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 14.6 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
-- Server OS:
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.statuses
DROP TABLE IF EXISTS "statuses";
CREATE TABLE IF NOT EXISTS "statuses" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''statuses_id_seq''::regclass)',
	"title" VARCHAR(32) NOT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"updated_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	PRIMARY KEY ("id"),
	UNIQUE INDEX "statuses_title_key" ("title")
);

-- Data exporting was unselected.

-- Dumping structure for table public.todos
DROP TABLE IF EXISTS "todos";
CREATE TABLE IF NOT EXISTS "todos" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''todos_id_seq''::regclass)',
	"title" VARCHAR(32) NOT NULL,
	"created_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"updated_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"parent_todo" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "parent_todo_id_unique_index" ("parent_todo"),
	CONSTRAINT "todos_parent_todo_fkey" FOREIGN KEY ("parent_todo") REFERENCES "todos" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Data exporting was unselected.

-- Dumping structure for table public.todo_status
DROP TABLE IF EXISTS "todo_status";
CREATE TABLE IF NOT EXISTS "todo_status" (
	"todo_id" INTEGER NOT NULL,
	"status_id" INTEGER NOT NULL,
	"updated_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	PRIMARY KEY ("todo_id", "status_id"),
	CONSTRAINT "todo_status_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "todo_status_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todos" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
