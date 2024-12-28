"""add recipe model

Revision ID: 4352a0963bf0
Revises: 
Create Date: 2024-12-28 13:19:15.708877

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4352a0963bf0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('ingredients', sa.Text(), nullable=False),
    sa.Column('steps', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipes')
    # ### end Alembic commands ###