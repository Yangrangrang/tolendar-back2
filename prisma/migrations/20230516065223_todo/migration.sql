-- CreateTable
CREATE TABLE "Todo" (
    "todoId" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "todoDate" TIMESTAMP(3) NOT NULL,
    "dayAgoAlarm" BOOLEAN,
    "veryDayAlarm" BOOLEAN,
    "userUserId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todoId")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
