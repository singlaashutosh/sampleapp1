
package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TransactionEntity;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.Set;
/**
 * Spring Data  repository for the TransactionEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionEntityRepository extends JpaRepository<TransactionEntity, Long> {
	Set<TransactionEntity> findByAccountEntityCode(Integer code);
}
