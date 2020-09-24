package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A AccountEntity.
 */
@Entity
@Table(name = "account_entity")
public class AccountEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "code", unique = true)
    private Integer code;

    @NotNull
    @Column(name = "account_entity_name", nullable = false, unique = true)
    private String accountEntityName;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "opening_balance", nullable = false)
    private Double openingBalance;

    @Column(name = "closing_balance")
    private Double closingBalance;

    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "accountEntity")
    private Set<TransactionEntity> transactionEntities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public AccountEntity code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getAccountEntityName() {
        return accountEntityName;
    }

    public AccountEntity accountEntityName(String accountEntityName) {
        this.accountEntityName = accountEntityName;
        return this;
    }

    public void setAccountEntityName(String accountEntityName) {
        this.accountEntityName = accountEntityName;
    }

    public String getDescription() {
        return description;
    }

    public AccountEntity description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getOpeningBalance() {
        return openingBalance;
    }

    public AccountEntity openingBalance(Double openingBalance) {
        this.openingBalance = openingBalance;
        return this;
    }

    public void setOpeningBalance(Double openingBalance) {
        this.openingBalance = openingBalance;
    }

    public Double getClosingBalance() {
        return closingBalance;
    }

    public AccountEntity closingBalance(Double closingBalance) {
        this.closingBalance = closingBalance;
        return this;
    }

    public void setClosingBalance(Double closingBalance) {
        this.closingBalance = closingBalance;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public AccountEntity createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Set<TransactionEntity> getTransactionEntities() {
        return transactionEntities;
    }

    public AccountEntity transactionEntities(Set<TransactionEntity> transactionEntities) {
        this.transactionEntities = transactionEntities;
        return this;
    }

    public AccountEntity addTransactionEntity(TransactionEntity transactionEntity) {
        this.transactionEntities.add(transactionEntity);
        transactionEntity.setAccountEntity(this);
        return this;
    }

    public AccountEntity removeTransactionEntity(TransactionEntity transactionEntity) {
        this.transactionEntities.remove(transactionEntity);
        transactionEntity.setAccountEntity(null);
        return this;
    }

    public void setTransactionEntities(Set<TransactionEntity> transactionEntities) {
        this.transactionEntities = transactionEntities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountEntity)) {
            return false;
        }
        return id != null && id.equals(((AccountEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountEntity{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", accountEntityName='" + getAccountEntityName() + "'" +
            ", description='" + getDescription() + "'" +
            ", openingBalance=" + getOpeningBalance() +
            ", closingBalance=" + getClosingBalance() +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
