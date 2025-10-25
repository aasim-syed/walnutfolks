from sqlalchemy import Column, String, Integer, Float, DateTime, Enum, UniqueConstraint
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from .db import Base

class TxStatus(str, PyEnum):
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String, nullable=False, unique=True, index=True)
    source_account = Column(String, nullable=False)
    destination_account = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, nullable=False)
    status = Column(Enum(TxStatus), nullable=False, default=TxStatus.PROCESSING)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    processed_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        UniqueConstraint('transaction_id', name='uq_txn_id'),
    )
