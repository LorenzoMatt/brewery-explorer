package com.example.brewery.repository;

import com.example.brewery.entity.AppUser;
import com.example.brewery.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT f FROM Favorite f WHERE f.user.username = :username")
    List<Favorite> findByUserUsername(@Param("username") String username);

    @Modifying
    @Transactional
    @Query("DELETE FROM Favorite f WHERE f.user.username = :username AND f.breweryId = :breweryId")
    void deleteByUserUsernameAndBreweryId(@Param("username") String username, @Param("breweryId") String breweryId);

    @Query("SELECT f.breweryId FROM Favorite f WHERE f.user.username = :username")
    List<String> findFavoriteIdsByUsername(@Param("username") String username);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Favorite f WHERE f.user.username = :username AND f.breweryId = :breweryId")
    boolean isBreweryInFavorites(@Param("username") String username, @Param("breweryId") String breweryId);
}
